import * as React from 'react';
import { PropertyEditorProps } from '../properties/property-editor-props';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox, Button, Typography } from '@material-ui/core';
import ImageUploader from '../media/ImageUploader';
import mediaService from '../media/media.service';
import entityService from '../entities/entity.service';
import { MediaItem } from '../media/media-item.model';

export interface MediaPickerEditorOptions {
  max: number;
  allowedFileTypes?: string[];
}

interface State {
  allImages: MediaItem[];
  loading: boolean;
  deleting: any;
}

interface Props extends MediaPickerEditorOptions, PropertyEditorProps<MediaItem[]> {}

class MediaPickerEditor extends React.Component<Props, State> {
  state: State = {
    allImages: [],
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
          allImages: images
        });
      });
  }

  clear() {
    this.props.setValue([]);
  }

  renderSelectedImages(mediaItems: MediaItem[]) {
    return (
      <List>
        {this.state.allImages.map((image, index) => {
          const selected = mediaItems.some(m => m._id === image._id);
          const deleting = Boolean(this.state.deleting[image._id]);
          return (
            <ListItem
              disabled={mediaItems.length >= this.props.max && !selected}
              key={index}
              button
              onClick={() => {
                const newValue: MediaItem[] = selected
                  ? mediaItems.filter(m => m._id !== image._id)
                  : [
                      ...mediaItems.filter(m => m._id !== image._id),
                      {
                        _id: image._id
                      }
                    ];
                this.props.setValue(newValue);
              }}
            >
              <div
                style={{
                  height: '50px',
                  width: '50px',
                  backgroundImage: `url(${mediaService.buildUrl(image._id)})`,
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
