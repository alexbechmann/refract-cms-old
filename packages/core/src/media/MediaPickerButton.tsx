import * as React from 'react';
import { PropertyEditorProps } from '../properties/property-editor-props';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent
} from '@material-ui/core';
import ImageUploaderButton from '../media/ImageUploaderButton';
import mediaService from '../media/media.service';
import entityService from '../entities/entity.service';
import { MediaItem } from '../media/media-item.model';
import { Entity } from '../entities/entity.model';
import ReactCrop from 'react-image-crop';
import ImageCropper from '../media/ImageCropper';
import { Crop } from './crop.model';
import { MediaPickerEditorOptions } from '../property-editors/MediaPickerEditor';

interface State {
  mediaFiles: MediaFile[];
  loading: boolean;
  dialogOpen: boolean;
}

interface MediaFile extends Entity {}

interface Props extends MediaPickerEditorOptions {
  onSelect: (mediaItem: MediaItem) => void;
}

class MediaPickerButton extends React.Component<Props, State> {
  state: State = {
    mediaFiles: [],
    loading: true,
    dialogOpen: false
  };

  constructor(props) {
    super(props);
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    const { dialogOpen } = this.state;
    return (
      <div>
        <Dialog open={dialogOpen}>
          <DialogContent>{this.renderImagePicker()}</DialogContent>
          <DialogActions>
            <ImageUploaderButton onUploaded={this.refresh} />
            <Button onClick={() => this.setState({ dialogOpen: false })}>Close</Button>
          </DialogActions>
        </Dialog>
        <Button onClick={() => this.setState({ dialogOpen: !dialogOpen })}>Pick image</Button>
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

  renderImagePicker(mediaItem?: MediaItem) {
    return (
      <List>
        {this.state.mediaFiles.map((file, index) => {
          const selected = mediaItem && mediaItem._id === file._id;
          return (
            <ListItem
              key={index}
              button
              onClick={() => {
                const newValue: MediaItem = selected
                  ? undefined
                  : {
                      _id: file._id
                    };
                this.props.onSelect(newValue);
                this.setState({
                  dialogOpen: false
                });
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
            </ListItem>
          );
        })}
      </List>
    );
  }
}

export default MediaPickerButton;
