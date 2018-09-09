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
import { Entity } from './entity.model';
import { ConnectedReduxProps } from '../state/connected-redux-props';
import { getEntitiesForAlias } from './state/entity.actions';

export interface EntityListProps {
  routes: Routes;
  entities: Entity[];
  loading: boolean;
}

interface State {
  entities: Entity[];
  loading: boolean;
}

interface Props
  extends EntityListProps,
    RouteComponentProps<{}>,
    ConnectedReduxProps,
    EntityListPropsExtended,
    WithStyles<typeof styles> {}

const styles = (theme: Theme) => ({
  root: {
    padding: theme.spacing.unit
  }
});

class EntityList extends React.Component<Props> {
  componentDidMount() {
    this.props.dispatch(getEntitiesForAlias(this.props.entity.options.alias, this.props.dispatch));
  }

  render() {
    const { options } = this.props.entity;
    const { classes, entities } = this.props;
    return this.props.loading && entities.length === 0 ? (
      <CircularProgress />
    ) : (
      <div className={classes.root}>
        <Typography variant="title" gutterBottom>
          {this.props.entity.options.displayName || this.props.entity.options.alias}
        </Typography>
        {this.props.entity.options.maxOne && this.props.entities.length >= 1 ? (
          <React.Fragment />
        ) : (
          this.renderNewButton()
        )}
        <List>
          {this.props.entities.map(entity => {
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

function mapStateToProps(state: AppState, ownProps: EntityListPropsExtended): EntityListProps {
  return {
    routes: state.router.routes,
    entities: state.entity.entities[ownProps.entity.options.alias] || [],
    loading: state.entity.loading[ownProps.entity.options.alias]
  };
}

export default combineContainers(withRouter, connect(mapStateToProps), withStyles(styles))(
  EntityList
) as React.ComponentType<EntityListPropsExtended>;
