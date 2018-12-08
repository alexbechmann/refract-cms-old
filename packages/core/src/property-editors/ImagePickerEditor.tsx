import React from 'react';
import Cropper from 'react-easy-crop';
import { PropertyEditorProps } from '../properties/property-editor-props';
import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
  Typography,
  CircularProgress,
  Button,
  List,
  ListItem,
  Dialog,
  DialogContent,
  DialogActions,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  ButtonBase,
  Toolbar
} from '@material-ui/core';
import { ImageRef } from '../files/image-ref.model';
import FileList from '../files/FileList';
import { File } from '../files/file.model';
import { Crop } from '../files/crop.model';
import classNames from 'classnames';
import { fileService } from '../files/file.service';

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
      height: '100%',
      position: 'relative'
    }
  });

interface Props extends ImagePickerEditorOptions<any>, PropertyEditorProps<ImageRef<any>>, WithStyles<typeof styles> {}

interface State {
  activeCropName: string | null;
}

const ImagePickerEditor = withStyles(styles)(
  class extends React.Component<Props, State> {
    state = {
      activeCropName: null
    };
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
            <Grid container spacing={16}>
              {Object.keys(cropDefinitions).map(cropKey => {
                const cropDefinition = cropDefinitions[cropKey];
                return (
                  <Grid item xs={12} sm={6} md={4} key={cropKey}>
                    <Typography gutterBottom variant="caption">
                      {cropKey}
                    </Typography>
                    <ButtonBase
                      onClick={() => {
                        this.setState({
                          activeCropName: cropKey
                        });
                      }}
                    >
                      <img
                        style={{ width: '100%' }}
                        src={fileService.buildImageUrl(this.props.value!, this.props.value!.crops[cropKey])}
                      />
                    </ButtonBase>
                    <Dialog open={cropKey === this.state.activeCropName} fullScreen>
                      <DialogContent>
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
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={() => {
                            this.setState({
                              activeCropName: null
                            });
                          }}
                        >
                          Done
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Grid>
                );
              })}
            </Grid>
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
            <Button onClick={() => setValue(undefined)}>Remove picture</Button>
            <Button onClick={() => setValue(undefined)}>Change picture</Button>
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
