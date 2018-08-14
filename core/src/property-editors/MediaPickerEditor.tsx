import * as React from 'react';
import { PropertyEditorProps } from '../properties/property-editor-props';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox } from '@material-ui/core';
import ImageUploader from '../media/ImageUploader';
import mediaService from '../media/media.service';

export interface MediaPickerEditorOptions {
  max: number;
  allowedFileTypes?: string[];
}

interface State {
  allImages: any[];
  loading: boolean;
  deleting: any;
}

interface Props extends MediaPickerEditorOptions, PropertyEditorProps<string[]> {}

class MediaPickerEditor extends React.Component<Props, State> {
  state: State = {
    allImages: [],
    loading: true,
    deleting: {}
  };

  unsubscribe?: () => void;

  constructor(props) {
    super(props);
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    this.refresh();
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render() {
    return (
      <div>
        <ImageUploader onUploaded={this.refresh} />
        {this.renderSelectedImages()}
      </div>
    );
  }

  refresh() {
    mediaService.getAll().then(images => {
      this.setState({
        allImages: images
      });
    });
  }

  renderSelectedImages() {
    const value = this.props.value || [];
    return (
      <List>
        {this.state.allImages.map((mediaItem, index) => {
          const selected = value.some(id => id === mediaItem._id);
          const deleting = Boolean(this.state.deleting[mediaItem._id]);
          return (
            <ListItem
              disabled={value.length >= this.props.max && !selected}
              key={index}
              button
              onClick={() => {
                const newValue = selected
                  ? value.filter(id => id !== mediaItem._id)
                  : [...value.filter(id => id !== mediaItem._id), mediaItem._id];
                this.props.setValue(newValue);
              }}
            >
              <div
                style={{
                  height: '50px',
                  width: '50px',
                  backgroundImage: `url(${mediaService.url(mediaItem._id)})`,
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

export default (options?: MediaPickerEditorOptions) => (props: PropertyEditorProps<string[]>) => (
  <MediaPickerEditor {...props} {...options} />
);
