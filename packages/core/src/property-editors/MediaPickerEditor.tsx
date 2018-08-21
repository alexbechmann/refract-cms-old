import * as React from 'react';
import { PropertyEditorProps } from '../properties/property-editor-props';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox, Button, Typography } from '@material-ui/core';
import ImageUploader from '../media/ImageUploader';
import mediaService from '../media/media.service';
import entityService from '../entities/entity.service';
import { MediaItem } from '../media/media-item.model';
import { Entity } from '../entities/entity.model';
import ReactCrop from 'react-image-crop';
import ImageCropper from '../media/ImageCropper';

export interface CropDefinition {
  ratio?: number;
  height?: number;
  width?: number;
}

export interface MediaPickerEditorOptions {
  max: number;
  allowedFileTypes?: string[];
  namedCrops?: {
    [key: string]: CropDefinition;
  };
}

interface State {
  mediaFiles: MediaFile[];
  loading: boolean;
  deleting: any;
}

interface MediaFile extends Entity {}

interface Props extends MediaPickerEditorOptions, PropertyEditorProps<MediaItem[]> {}

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
    const value = this.props.value || [];
    return (
      <div>
        <Typography>Selected ({value.length})</Typography>
        <ImageUploader onUploaded={this.refresh} />
        {this.renderImagePicker(value)}
        {this.renderSelectedImages(value)}
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
    this.props.setValue([]);
  }

  renderImagePicker(mediaItems: MediaItem[]) {
    return (
      <List>
        {this.state.mediaFiles.map((file, index) => {
          const selected = mediaItems.some(m => m._id === file._id);
          const deleting = Boolean(this.state.deleting[file._id]);
          return (
            <ListItem
              disabled={mediaItems.length >= this.props.max && !selected}
              key={index}
              button
              onClick={() => {
                const newValue: MediaItem[] = selected
                  ? mediaItems.filter(m => m._id !== file._id)
                  : [
                      ...mediaItems.filter(m => m._id !== file._id),
                      {
                        _id: file._id
                      }
                    ];
                this.props.setValue(newValue);
              }}
            >
              <div
                style={{
                  height: '50px',
                  width: '50px',
                  backgroundImage: `url(${mediaService.buildUrl(file._id)})`,
                  backgroundSize: 'cover'
                }}
              />
              <ListItemText primary={index} />
              <ListItemSecondaryAction>
                {deleting ? (
                  <p>deleting...</p>
                ) : (
                  <ListItemSecondaryAction>
                    <Checkbox checked={selected} />
                  </ListItemSecondaryAction>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    );
  }

  renderSelectedImages(mediaItems: MediaItem[]) {
    const { namedCrops, setValue } = this.props;
    return (
      <div>
        {mediaItems.map((mediaItem, index) => {
          return (
            <div>
              {mediaItem._id}
              {namedCrops &&
                Object.keys(namedCrops).map(cropKey => {
                  const cropDefinition = namedCrops[cropKey];
                  const crop = mediaItem.crops ? mediaItem.crops[cropKey] : {};
                  return (
                    <p>
                      <Typography>{cropKey}</Typography>
                      <ImageCropper
                        imageId={mediaItem._id}
                        crop={crop}
                        onChange={crop => {
                          setValue([
                            ...mediaItems.filter((m, i) => i !== index),
                            {
                              ...mediaItem,
                              crops: {
                                ...mediaItem.crops,
                                [cropKey]: crop
                              }
                            }
                          ]);
                        }}
                      />
                    </p>
                  );
                })}
            </div>
          );
        })}
      </div>
    );
  }
}

export const SingleMediaPickerEditor = (options?: MediaPickerEditorOptions) => (
  props: PropertyEditorProps<MediaItem>
) => (
  <MediaPickerEditor
    propertyKey={props.propertyKey}
    propertyOptions={props.propertyOptions}
    value={props.value ? [props.value] : []}
    setValue={values => {
      props.setValue(values[0]);
    }}
    {...options}
  />
);

export const MultipleMediaPickerEditor = (options?: MediaPickerEditorOptions) => (
  props: PropertyEditorProps<MediaItem[]>
) => <MediaPickerEditor {...props} {...options} />;