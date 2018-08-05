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
  Button,
  Checkbox
} from '@material-ui/core';
import firebase from 'firebase';
import * as Icons from '@material-ui/icons';
import createUniqueString from 'unique-string';
import { MediaItem } from '../media/media-item.model';

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

interface Props extends MediaPickerEditorOptions, PropertyEditorProps<firebase.firestore.DocumentReference[]> {}

class MediaPickerEditor extends React.Component<Props, State> {
  state: State = {
    docs: [],
    loading: true,
    deleting: {}
  };

  unsubscribe?: () => void;

  componentDidMount() {
    this.unsubscribe = firebase
      .firestore()
      .collection('media')
      .onSnapshot(snapshot => {
        this.setState({
          docs: snapshot.docs
        });
        this.setState({
          loading: false
        });
      });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render() {
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
        {this.state.docs.map((doc, index) => {
          const mediaItem = doc.data() as MediaItem;
          const selected = value.some(d => d.id === doc.id);
          const deleting = Boolean(this.state.deleting[mediaItem.fullPath]);
          return (
            <ListItem
              key={index}
              button
              onClick={() => {
                const newValue = selected
                  ? value.filter(d => d.id !== doc.id)
                  : [...value.filter(d => d.id !== doc.id), doc.ref];
                this.props.setValue(newValue);
              }}
            >
              <div
                style={{
                  height: '50px',
                  width: '50px',
                  backgroundImage: `url(${mediaItem.url})`,
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

  // removeMediaItem = (mediaRef: firebase.storage.Reference) => () => {
  //   this.setState({
  //     deleting: {
  //       ...this.state.deleting,
  //       path: true
  //     }
  //   });
  //   mediaRef
  //     .delete()
  //     .then(() => {
  //       this.setState({
  //         deleting: {
  //           ...this.state.deleting,
  //           path: false
  //         }
  //       });
  //     })
  //     .catch(console.log);
  // };

  renderProgress() {
    console.log(this.state.uploadSnapshot);
    const { bytesTransferred, totalBytes } = this.state.uploadSnapshot!;
    return <LinearProgress variant="determinate" value={(bytesTransferred / totalBytes) * 100} />;
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
      }
    );
  };
}

export default (options?: MediaPickerEditorOptions) => (
  props: PropertyEditorProps<firebase.firestore.DocumentReference[]>
) => <MediaPickerEditor {...props} {...options} />;
