import * as React from 'react';
import { PropertyEditorProps } from '../properties/property-editor-props';
import {
  IconButton,
  LinearProgress,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button
} from '@material-ui/core';
import firebase from 'firebase';
import * as Icons from '@material-ui/icons';
import createUniqueString from 'unique-string';

export interface MediaPickerEditorOptions {
  max: number;
  allowedFileTypes?: string[];
}

interface State {
  docs: firebase.firestore.DocumentSnapshot[];
  loading: boolean;
  uploadSnapshot?: firebase.storage.UploadTaskSnapshot;
  deleting: any;
}

interface Props extends MediaPickerEditorOptions, PropertyEditorProps<firebase.storage.Reference[]> {}

class MediaPickerEditor extends React.Component<Props, State> {
  state: State = {
    docs: [],
    loading: true,
    deleting: {}
  };

  render() {
    const value = this.props.value || [];
    return (
      <div>
        {this.renderSelectedImages()}
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
        {value.map((mediaItem, index) => {
          const deleting = Boolean(this.state.deleting[mediaItem.fullPath]);
          return (
            <ListItem key={index}>
              <div
                style={{
                  height: '50px',
                  width: '50px',
                  //backgroundImage: `url(${mediaItem.ur})`,
                  backgroundSize: 'cover'
                }}
              />
              <ListItemText primary={index} />
              <ListItemSecondaryAction>
                {deleting ? <p>deleting...</p> : <Button onClick={this.removeMediaItem(mediaItem)}>Remove</Button>}
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    );
  }

  removeMediaItem = (mediaItem: firebase.storage.Reference) => () => {
    this.setState({
      deleting: {
        ...this.state.deleting,
        path: true
      }
    });
    this.props.setValue(this.props.value.filter(mediaItem => mediaItem.fullPath !== mediaItem.fullPath));
    mediaItem
      .delete()
      .then(() => {
        this.setState({
          deleting: {
            ...this.state.deleting,
            path: false
          }
        });
      })
      .catch(console.log);
  };

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
        this.props.setValue([...this.props.value, uploadTask.snapshot.ref]);
      }
    );
  };
}

export default (options?: MediaPickerEditorOptions) => (props: PropertyEditorProps<firebase.storage.Reference[]>) => (
  <MediaPickerEditor {...props} {...options} />
);
