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
  DialogTitle,
  createStyles
} from '@material-ui/core';
import { combineContainers } from 'combine-containers';
import { graphql, DataProps } from 'react-apollo';
import { graphqlQueryHelper } from '../graphql/graphql-query-helper';
import { EntitySchema } from '../entities/entity-schema';
import { Entity } from '../entities/entity.model';
import EntityListItem from '../entities/EntityListItem';
import { entityService } from '../entities/services/entity.service';

export interface SingleEntityPickerOptions {
  schema: EntitySchema;
}

const styles = (theme: Theme) =>
  createStyles({
    editor: {
      width: '100%'
    },
    textLink: {
      cursor: 'pointer',
      color: theme.palette.secondary.main,
      '&:hover': {
        textDecoration: 'underline'
      }
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
    const instanceDisplayProps = entityService.instanceDisplayPropsOrDefault(schema);
    const match = data.items ? data.items.find(entity => entity._id === value) : undefined;
    return data.items ? (
      <div>
        {value ? (
          <div>
            <Typography
              className={classes.textLink}
              component="a"
              gutterBottom
              onClick={() => this.setState({ dialogOpen: true })}
            >
              {match ? `${instanceDisplayProps(match).primaryText}` : `${schema.options.displayName}`}
            </Typography>
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
                const handleOnChange = () => {
                  if (checked) {
                    setValue(undefined);
                  } else {
                    setValue(entity._id);
                  }
                };
                return (
                  <EntityListItem
                    entity={entity}
                    schema={schema}
                    key={entity._id}
                    button
                    onClick={handleOnChange}
                    SecondaryAction={<Checkbox onChange={handleOnChange} checked={checked} />}
                  />
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
