import * as React from 'react';
import { PropertyEditorProps } from '../properties/property-editor-props';
import {
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  CircularProgress
} from '@material-ui/core';
import firebase from 'firebase';

export interface EntityPickerEditorOptions {
  max: number;
  entityAlias: string;
}

interface State {
  docs: firebase.firestore.DocumentReference[];
  loading: boolean;
}

interface Props extends EntityPickerEditorOptions, PropertyEditorProps<firebase.firestore.DocumentReference[]> {}

class EntityPickerEditor extends React.Component<Props, State> {
  unsubscribe?: () => void;

  state: State = {
    docs: [],
    loading: true
  };

  render() {
    const value = this.props.value || [];
    return (
      <List>
        {this.state.docs.map(doc => {
          const selected = value.some(d => d.id === doc.id);
          return !this.state.loading ? (
            <ListItem
              key={doc.id}
              button
              onClick={() => {
                const newValue = selected
                  ? value.filter(d => d.id !== doc.id)
                  : [...value.filter(d => d.id !== doc.id), doc];
                this.props.setValue(newValue);
              }}
            >
              <ListItemText primary={doc.id} />
              <ListItemSecondaryAction>
                <Checkbox checked={selected} />
              </ListItemSecondaryAction>
            </ListItem>
          ) : (
            <CircularProgress />
          );
        })}
      </List>
    );
  }

  componentDidMount() {
    this.unsubscribe = firebase
      .firestore()
      .collection('product')
      .onSnapshot(snapshot => {
        this.setState({
          docs: snapshot.docs.map(doc => doc.ref)
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
}

export default (options?: EntityPickerEditorOptions) => (
  props: PropertyEditorProps<firebase.firestore.DocumentReference[]>
) => <EntityPickerEditor {...props} {...options} />;
