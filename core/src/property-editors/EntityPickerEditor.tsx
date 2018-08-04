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
  docs: firebase.firestore.DocumentSnapshot[];
  loading: boolean;
}

interface Props extends EntityPickerEditorOptions, PropertyEditorProps<string[]> {}

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
          return !this.state.loading ? (
            <ListItem
              key={doc.id}
              button
              onClick={() => {
                this.props.setValue([...value.filter(v => v !== doc.id), doc.id]);
              }}
            >
              <ListItemText primary={doc.id} />
              <ListItemSecondaryAction>
                <Checkbox checked={value.some(id => id === doc.id)} />
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
}

export default (options?: EntityPickerEditorOptions) => (props: PropertyEditorProps<string[]>) => (
  <EntityPickerEditor {...props} {...options} />
);
