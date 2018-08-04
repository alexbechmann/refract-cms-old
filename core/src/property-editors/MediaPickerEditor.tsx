import * as React from 'react';
import { PropertyEditorProps } from '../properties/property-editor-props';
import { IconButton, LinearProgress, Typography, List, ListItem, ListItemText } from '@material-ui/core';
import firebase from 'firebase';
import * as Icons from '@material-ui/icons';
import { MediaItem } from '../media/media-item.model';
import createUniqueString from 'unique-string';

export interface MediaPickerEditorOptions {
  max: number;
  allowedFileTypes?: string[];
}

interface State {
  docs: firebase.firestore.DocumentSnapshot[];
  loading: boolean;
  uploadSnapshot?: firebase.storage.UploadTaskSnapshot;
}

interface Props extends MediaPickerEditorOptions, PropertyEditorProps<MediaItem[]> {}

class MediaPickerEditor extends React.Component<Props, State> {
  state: State = {
    docs: [],
    loading: true
  };

  render() {
    const value = this.props.value || [];
    console.log(value);
    return (
      <div>
        <Typography>
          Selected images:
          {value.map(mediaItem => (
            <p>{mediaItem.url}</p>
          ))}
        </Typography>
        {this.state.uploadSnapshot && this.renderProgress()}
        <input onChange={this.handleImageChange} accept="image/*" id="icon-button-file" type="file" />
        <label htmlFor="icon-button-file">
          <IconButton color="primary" component="span">
            <Icons.Photo />
          </IconButton>
        </label>
      </div>
    );
  }

  renderSelectedImages() {
    const value = this.props.value || [];
    return (
      <List>
        {value.map(mediaItem => {
          return (
            <ListItem>
              <image href={mediaItem.url} />
              <ListItemText primary={mediaItem.url} primaryTypographyProps={{ noWrap: true }} />
            </ListItem>
          );
        })}
      </List>
    );
  }

  renderProgress() {
    const { bytesTransferred, totalBytes } = this.state.uploadSnapshot!;
    return <LinearProgress variant="determinate" value={(totalBytes / bytesTransferred) * 100} />;
  }

  handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uniqueString = createUniqueString();
    const file = e.target.files[0];
    const imageRef = firebase
      .storage()
      .ref()
      .child('firestore-cms')
      .child('media')
      .child(`${uniqueString}_${file.name}`);
    const uploadTask = imageRef.put(file);
    uploadTask.on(
      'state_changed',
      (uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {
        this.setState({
          uploadSnapshot
        });
      },
      error => console.log(error),
      () => {
        this.setState({
          uploadSnapshot: undefined
        });
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          const newValue = [
            ...(this.props.value || []),
            {
              url: downloadURL
            }
          ];
          this.props.setValue(newValue);
        });
      }
    );
  };
}

export default (options?: MediaPickerEditorOptions) => (props: PropertyEditorProps<MediaItem[]>) => (
  <MediaPickerEditor {...props} {...options} />
);
