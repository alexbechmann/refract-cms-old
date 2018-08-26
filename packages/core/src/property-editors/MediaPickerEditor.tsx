import * as React from 'react';
import { PropertyEditorProps } from '../properties/property-editor-props';
import { Button, Typography, List, ListItem, ListItemText, Avatar, ListSubheader } from '@material-ui/core';
import entityService from '../entities/entity.service';
import { MediaItem } from '../media/media-item.model';
import { Entity } from '../entities/entity.model';
import ImageCropperDialog from '../media/ImageCropperDialog';
import MediaPickerDialog from '../media/MediaPickerDialog';
import { Crop } from 'react-image-crop';
import { CropDescription } from '../media/models/crop-description.model';
import mediaService from '../media/media.service';

export interface MediaPickerEditorOptions {
  allowedFileTypes?: string[];
  namedCrops?: {
    [key: string]: CropDescription;
  };
}

interface State {
  mediaFiles: MediaFile[];
  loading: boolean;
  deleting: any;
  imagePickerDialogOpen: boolean;
  cropDialogOpen: string | undefined;
}

interface MediaFile extends Entity {}

interface Props extends MediaPickerEditorOptions, PropertyEditorProps<MediaItem> {}

class MediaPickerEditor extends React.Component<Props, State> {
  state: State = {
    mediaFiles: [],
    loading: true,
    deleting: {},
    imagePickerDialogOpen: false,
    cropDialogOpen: undefined
  };

  constructor(props) {
    super(props);
    this.refresh = this.refresh.bind(this);
    this.clear = this.clear.bind(this);
  }

  componentDidMount() {
    this.refresh();
  }

  smallestNamedCropWidth() {
    return Object.keys(this.props.namedCrops)
      .map(key => this.props.namedCrops[key])
      .reduce((prev, current) => {
        return prev.width < current.width ? prev : current;
      }).width;
  }

  smallestNamedCropHeight() {
    return Object.keys(this.props.namedCrops)
      .map(key => this.props.namedCrops[key])
      .reduce((prev, current) => {
        return prev.height < current.height ? prev : current;
      }).height;
  }

  render() {
    const { value } = this.props;
    return (
      <div>
        <MediaPickerDialog
          open={this.state.imagePickerDialogOpen}
          handleClose={() => this.setState({ imagePickerDialogOpen: false })}
          minWidth={this.smallestNamedCropWidth()}
          minHeight={this.smallestNamedCropHeight()}
          onSelect={value => {
            this.props.setValue(value);
            this.setState({ imagePickerDialogOpen: false });
          }}
        />

        {value ? (
          <div>
            {this.renderSelectedImage(value)}
            <Button onClick={this.clear}>Clear</Button>{' '}
          </div>
        ) : (
          <Button onClick={() => this.setState({ imagePickerDialogOpen: true })}>Select image</Button>
        )}
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
        <div
          style={{
            width: 50,
            height: 50,
            backgroundImage: `url('${mediaService.buildUrl(mediaItem._id)}')`,
            backgroundSize: 'cover'
          }}
        />
        {namedCrops && (
          <List subheader={<ListSubheader>Crops</ListSubheader>}>
            {Object.keys(namedCrops).map(cropKey => {
              const cropDefinition = namedCrops[cropKey];
              const crops = mediaItem.crops ? mediaItem.crops[cropKey] : {};
              return (
                <ListItem
                  button
                  key={cropKey}
                  onClick={() => {
                    if (this.state.cropDialogOpen !== cropKey) {
                      this.setState({ cropDialogOpen: cropKey });
                    }
                  }}
                >
                  <Avatar src={mediaService.buildUrl(mediaItem._id)} />
                  <ListItemText primary={`Crop: ${cropKey}`} />
                  <ImageCropperDialog
                    open={this.state.cropDialogOpen === cropKey}
                    handleClose={() => {
                      this.setState({
                        cropDialogOpen: undefined
                      });
                    }}
                    minWidth={cropDefinition.width}
                    minHeight={cropDefinition.height}
                    mediaItem={mediaItem}
                    crops={crops}
                    onChange={newCrops => {
                      setValue({
                        ...mediaItem,
                        crops: {
                          ...mediaItem.crops,
                          [cropKey]: newCrops
                        }
                      });
                    }}
                  />
                </ListItem>
              );
            })}
          </List>
        )}
      </div>
    );
  }
}

export default (options?: MediaPickerEditorOptions) => (props: PropertyEditorProps<MediaItem>) => (
  <MediaPickerEditor {...props} {...options} />
);
