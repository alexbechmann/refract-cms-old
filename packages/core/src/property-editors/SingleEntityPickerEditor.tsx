import * as React from 'react';
import { PropertyEditorProps } from '../properties/property-editor-props';
import {
  Theme,
  withStyles,
  WithStyles,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  Dialog,
  DialogContent,
  Typography,
  Button,
  DialogActions,
  DialogTitle
} from '@material-ui/core';
import { combineContainers } from 'combine-containers';
import { graphql, DataProps } from 'react-apollo';
import gql from 'graphql-tag';
import { graphqlQueryHelper } from '../graphql/graphql-query-helper';
import { EntitySchema } from '../items/entity-schema';
import { Entity } from '../items/entity.model';

export interface SingleEntityPickerOptions {
  schema: EntitySchema;
}

const styles = (theme: Theme) => ({
  editor: {
    width: '100%'
  }
});

interface Props
  extends PropertyEditorProps<string>,
    WithStyles<typeof styles>,
    SingleEntityPickerOptions,
    DataProps<{
      items: Entity[];
    }> {}

interface State {
  dialogOpen: boolean;
}

class SingleEntityPickerEditor extends React.Component<Props, State> {
  state: State = {
    dialogOpen: false
  };
  render() {
    const { classes, value, data, setValue, schema } = this.props;
    if (data.loading) {
      return <CircularProgress />;
    }
    const instanceDisplayProps =
      schema.options.instanceDisplayProps ||
      (entity => ({
        primaryText: entity._id,
        secondaryText: undefined
      }));

    const match = data.items ? data.items.find(entity => entity._id === value) : undefined;
    return data.items ? (
      <div>
        {value ? (
          <div>
            <Typography gutterBottom>
              {match
                ? `${instanceDisplayProps(match).primaryText} selected.`
                : `${schema.options.displayName} selected.`}
            </Typography>
            <Button onClick={() => this.setState({ dialogOpen: true })}>Change</Button>
          </div>
        ) : (
          <Button onClick={() => this.setState({ dialogOpen: true })}>
            Click to select a {schema.options.displayName}
          </Button>
        )}

        <Dialog open={this.state.dialogOpen}>
          <DialogTitle>Select a {schema.options.displayName}</DialogTitle>
          <DialogContent>
            <List style={{ width: 500 }}>
              {data.items.map(entity => {
                const checked = entity._id === value;
                return (
                  <ListItem
                    key={entity._id}
                    button
                    onClick={() => {
                      if (checked) {
                        setValue(undefined);
                      } else {
                        setValue(entity._id);
                      }
                    }}
                  >
                    <ListItemText
                      primary={instanceDisplayProps(entity).primaryText}
                      secondary={instanceDisplayProps(entity).secondaryText}
                    />
                    <ListItemSecondaryAction>
                      <Checkbox checked={checked} />
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({ dialogOpen: false })}>Done</Button>
          </DialogActions>
        </Dialog>
      </div>
    ) : (
      <div>None found</div>
    );
  }
}

export default (options: SingleEntityPickerOptions) => {
  const ENTITY_PICKER_QUERY = graphqlQueryHelper.getAllQueryWithAllFields(options.schema);
  const Editor = combineContainers(withStyles(styles), graphql(ENTITY_PICKER_QUERY))(
    SingleEntityPickerEditor
  ) as React.ComponentType<PropertyEditorProps<string>>;
  return (props: PropertyEditorProps<string>) => <Editor {...props} {...options} />;
};
