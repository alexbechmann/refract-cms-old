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
import * as firebase from 'firebase';
import { MediaItem } from '../media/media-item.model';
import ImageUploader from '../media/ImageUploader';

export interface MediaPickerEditorOptions {
  max: number;
  allowedFileTypes?: string[];
}

interface State {
  docs: firebase.firestore.DocumentSnapshot[];
  loading: boolean;
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
        <ImageUploader />
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
              disabled={value.length >= this.props.max && !selected}
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
}

export default (options?: MediaPickerEditorOptions) => (
  props: PropertyEditorProps<firebase.firestore.DocumentReference[]>
) => <MediaPickerEditor {...props} {...options} />;
