import * as React from 'react';
import { PropertyEditorProps } from '../properties/property-editor-props';
import { Button, Typography } from '@material-ui/core';
import entityService from '../entities/entity.service';
import { MediaItem } from '../media/media-item.model';
import { Entity } from '../entities/entity.model';
import ImageCropper from '../media/ImageCropper';
import { Crop } from '../media/crop.model';
import MediaPickerButton from '../media/MediaPickerButton';

export interface MediaPickerEditorOptions {
  allowedFileTypes?: string[];
  namedCrops?: {
    [key: string]: Crop;
  };
}

interface State {
  mediaFiles: MediaFile[];
  loading: boolean;
  deleting: any;
}

interface MediaFile extends Entity {}

interface Props extends MediaPickerEditorOptions, PropertyEditorProps<MediaItem> {}

class MediaPickerEditor extends React.Component<Props, State> {
  state: State = {
    mediaFiles: [],
    loading: true,
    deleting: {}
  };

  constructor(props) {
    super(props);
    this.refresh = this.refresh.bind(this);
    this.clear = this.clear.bind(this);
  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    const value = this.props.value;
    return (
      <div>
        <MediaPickerButton onSelect={this.props.setValue} />
        {value && this.renderSelectedImage(value)}
        <Button onClick={this.clear}>Clear</Button>
      </div>
    );
  }

  refresh() {
    entityService
      .getAll({
        alias: 'media.files'
      })
      .then(images => {
        this.setState({
          mediaFiles: images
        });
      });
  }

  clear() {
    this.props.setValue(undefined);
  }

  renderSelectedImage(mediaItem: MediaItem) {
    const { namedCrops, setValue } = this.props;
    return (
      <div>
        {mediaItem._id}
        {namedCrops &&
          Object.keys(namedCrops).map(cropKey => {
            const cropDefinition = namedCrops[cropKey];
            const crop = mediaItem.crops ? mediaItem.crops[cropKey] : {};
            return (
              <div key={cropKey}>
                <Typography>Crop name: {cropKey}</Typography>
                <ImageCropper
                  imageId={mediaItem._id}
                  crop={crop}
                  onChange={crop => {
                    setValue({
                      ...mediaItem,
                      crops: {
                        ...mediaItem.crops,
                        [cropKey]: crop
                      }
                    });
                  }}
                />
              </div>
            );
          })}
      </div>
    );
  }
}

export default (options?: MediaPickerEditorOptions) => (props: PropertyEditorProps<MediaItem>) => (
  <MediaPickerEditor {...props} {...options} />
);
