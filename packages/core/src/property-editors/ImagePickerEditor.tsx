import React from 'react';
import Cropper from 'react-easy-crop';
import { PropertyEditorProps } from '../properties/property-editor-props';
import { Theme, createStyles, withStyles, WithStyles, Typography, CircularProgress, Button } from '@material-ui/core';
import { ImageRef } from '../files/image-ref.model';
import FileList from '../files/FileList';
import { File } from '../files/file.model';
import { Crop } from '../files/crop.model';
import classNames from 'classnames';

type Crops<TCrops extends string> = {
  [P in TCrops]: {
    aspectRatio: number;
    minWidth?: number;
  }
};

export interface ImagePickerEditorOptions<TCrops extends string> {
  cropDefinitions: Crops<TCrops>;
}

const styles = (theme: Theme) =>
  createStyles({
    cropContainer: {
      width: '100%',
      height: 400,
      position: 'relative'
    }
  });

interface Props extends ImagePickerEditorOptions<any>, PropertyEditorProps<ImageRef<any>>, WithStyles<typeof styles> {}

interface State {}

const ImagePickerEditor = withStyles(styles)(
  class extends React.Component<Props, State> {
    onCropChange = cropName => crop => {
      this.updateCrop(cropName)({ crop });
    };

    updateCrop = cropName => (values: Partial<Crop>) => {
      const { value, setValue } = this.props;
      if (value) {
        setValue({
          ...value,
          crops: {
            ...value.crops,
            [cropName]: {
              ...value.crops[cropName],
              ...values
            }
          }
        });
      }
    };

    onCropComplete = cropName => (croppedArea, pixelCrop) => {
      this.updateCrop(cropName)({ pixelCrop });
    };

    onZoomChange = cropName => zoom => {
      this.updateCrop(cropName)({ zoom });
    };

    render() {
      const { cropDefinitions, value, setValue, classes } = this.props;
      if (!value) {
        return (
          <div>
            <Typography>Select an image</Typography>
            <FileList
              onSelectFile={file => {
                const newValue = {
                  imageId: file._id,
                  imageUrl: file.url,
                  crops: Object.keys(cropDefinitions).reduce((acc, cropKey) => {
                    acc[cropKey] = {
                      crop: { x: 0, y: 0 },
                      zoom: 1
                    };
                    return acc;
                  }, {})
                };
                setValue(newValue);
              }}
            />
          </div>
        );
      } else {
        return (
          <div>
            {Object.keys(cropDefinitions).map(cropKey => {
              const cropDefinition = cropDefinitions[cropKey];
              return (
                <div key={cropKey}>
                  <Typography>{cropKey}</Typography>
                  <div className={classNames('crop-container', classes.cropContainer)}>
                    <Cropper
                      image={value.imageUrl}
                      crop={value.crops[cropKey].crop}
                      zoom={value.crops[cropKey].zoom}
                      aspect={cropDefinition.aspectRatio}
                      onCropChange={this.onCropChange(cropKey)}
                      onCropComplete={this.onCropComplete(cropKey)}
                      onZoomChange={this.onZoomChange(cropKey)}
                    />
                  </div>
                </div>
              );
            })}
            <div className="controls">
              {/* <Slider
              value={this.state.zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e, zoom) => this.onZoomChange(zoom)}
            /> */}
            </div>
            <Button onClick={() => setValue(undefined)}>Reset</Button>
          </div>
        );
      }
    }
  }
);

export default function<TCrops extends string>(options: ImagePickerEditorOptions<TCrops>) {
  return ((props: PropertyEditorProps<ImageRef<TCrops>>) => (
    <ImagePickerEditor {...(props as any) as PropertyEditorProps<ImageRef<TCrops>>} {...options} />
  )) as React.ComponentType<PropertyEditorProps<ImageRef<TCrops>>>;
}
