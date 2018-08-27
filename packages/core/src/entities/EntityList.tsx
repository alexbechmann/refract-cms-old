import * as React from 'react';
import { EntitySchema } from './entity-schema';
import { withRouter, RouteComponentProps } from 'react-router';
import { AppState } from '../state/app.state';
import { connect } from 'react-redux';
import { combineContainers } from 'combine-containers';
import { Routes } from '../router/routes';
import {
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Typography,
  Theme,
  withStyles,
  WithStyles
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import entityService from './entity.service';
import { Entity } from './entity.model';

export interface EntityListProps {
  routes: Routes;
}

interface State {
  entities: Entity[];
  loading: boolean;
}

interface Props extends EntityListProps, RouteComponentProps<{}>, EntityListPropsExtended, WithStyles<typeof styles> {}

const styles = (theme: Theme) => ({
  root: {
    padding: theme.spacing.unit
  }
});

class EntityList extends React.Component<Props> {
  state: State = {
    entities: [],
    loading: true
  };

  componentDidMount() {
    entityService.getAll({ alias: this.props.entity.options.alias }).then(data =>
      this.setState({
        entities: data,
        loading: false
      })
    );
  }

  render() {
    const { options } = this.props.entity;
    const { classes } = this.props;
    return this.state.loading ? (
      <CircularProgress />
    ) : (
      <div className={classes.root}>
        <Typography variant="title" gutterBottom>
          {this.props.entity.options.displayName || this.props.entity.options.alias}
        </Typography>
        {this.props.entity.options.maxOne && this.state.entities.length >= 1 ? (
          <React.Fragment />
        ) : (
          this.renderNewButton()
        )}
        <List>
          {this.state.entities.map(entity => {
            const entityName = options.instanceDisplayName ? options.instanceDisplayName(entity) : entity._id;
            return (
              <ListItem
                key={entity._id}
                button
                component={(props: any) => (
                  <Link
                    {...props}
                    to={this.props.routes.entityEditById.url({
                      id: entity._id,
                      entityAlias: this.props.entity.options.alias
                    })}
                  />
                )}
              >
                <ListItemText primary={entityName} />
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  }

  renderNewButton() {
    return (
      <Button
        component={(props: any) => (
          <Link
            {...props}
            to={this.props.routes.entityEditById.url({
              id: undefined,
              entityAlias: this.props.entity.options.alias
            })}
          />
        )}
      >
        Add new {this.props.entity.options.displayName}
      </Button>
    );
  }
}

export interface EntityListPropsExtended {
  entity: EntitySchema;
}

function mapStateToProps(state: AppState): EntityListProps {
  return {
    routes: state.router.routes
  };
}

export default combineContainers(withRouter, connect(mapStateToProps), withStyles(styles))(
  EntityList
) as React.ComponentType<EntityListPropsExtended>;
