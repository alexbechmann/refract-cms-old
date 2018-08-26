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
import ImageUploaderDialog from '../media/ImageUploaderDialog';
import mediaService from '../media/media.service';
import entityService from '../entities/entity.service';
import { MediaItem } from '../media/media-item.model';
import { Entity } from '../entities/entity.model';
import { MediaPickerEditorOptions } from '../property-editors/MediaPickerEditor';

interface State {
  mediaFiles: MediaFile[];
  loading: boolean;
  uploadDialogOpen: boolean;
}

interface MediaFile extends Entity {
  metadata: {
    mimetype: string;
    size: {
      width: number;
      height: number;
    };
  };
}

interface Props extends MediaPickerEditorOptions {
  open: boolean;
  handleClose: () => void;
  onSelect: (mediaItem: MediaItem) => void;
  minWidth?: number;
  minHeight?: number;
}

class MediaPickerDialog extends React.Component<Props, State> {
  state: State = {
    mediaFiles: [],
    loading: true,
    uploadDialogOpen: false
  };

  constructor(props) {
    super(props);
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    const { open } = this.props;
    return (
      <div>
        <Dialog open={open}>
          <DialogContent>{this.renderImagePicker()}</DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({ uploadDialogOpen: true })}>Upload</Button>
            <Button onClick={this.props.handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
        <ImageUploaderDialog
          open={this.state.uploadDialogOpen}
          handleClose={() => {
            this.setState({
              uploadDialogOpen: false
            });
          }}
          onUploaded={() => {
            this.refresh();
          }}
        />
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
    const { minWidth, minHeight, onSelect } = this.props;
    return (
      <List>
        {this.state.mediaFiles.map((file, index) => {
          const selected = mediaItem && mediaItem._id === file._id;
          const disabled =
            (minWidth && file.metadata.size.width < minWidth) === true ||
            (minHeight && file.metadata.size.height < minHeight) === true;
          return (
            <ListItem
              key={index}
              disabled={disabled}
              button
              onClick={() => {
                const newValue: MediaItem = selected
                  ? undefined
                  : {
                      _id: file._id
                    };
                onSelect(newValue);
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
              <ListItemText
                primary={`${file._id}`}
                secondary={`${file.metadata.size.width}x${file.metadata.size.height}`}
              />
            </ListItem>
          );
        })}
      </List>
    );
  }
}

export default MediaPickerDialog;
