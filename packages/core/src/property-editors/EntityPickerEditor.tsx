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
import { Entity } from '../entities/entity.model';
import { EntityService } from '../entities/entity.service';

export interface EntityPickerEditorOptions {
  max: number;
  entityAlias: string;
}

interface State {
  entities: Entity[];
  loading: boolean;
}

interface Props extends EntityPickerEditorOptions, PropertyEditorProps<string[]> {}

class EntityPickerEditor extends React.Component<Props, State> {
  unsubscribe?: () => void;

  state: State = {
    entities: [],
    loading: true
  };

  render() {
    const value = this.props.value || [];
    return (
      <List>
        {this.state.entities.map(entity => {
          const selected = value.some(id => id === entity._id);
          return !this.state.loading ? (
            <ListItem
              disabled={value.length >= this.props.max && !selected}
              key={entity._id}
              button
              onClick={() => {
                const newValue = selected
                  ? value.filter(id => id !== entity._id)
                  : [...value.filter(id => id !== entity._id), entity._id];
                this.props.setValue(newValue);
              }}
            >
              <ListItemText primary={entity._id} />
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
    new EntityService({ alias: this.props.entityAlias }).getAll().then(entities => {
      this.setState({
        entities,
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
