import * as React from 'react';
import { PropertyOptions } from '../properties/property-options';
import { Tabs, Tab, withStyles, WithStyles } from '@material-ui/core';
import { Route, RouteComponentProps, withRouter } from 'react-router';
import { combineContainers } from 'combine-containers';
import { AppState } from '../state/app.state';
import { connect } from 'react-redux';
import EntityForm from './EntityForm';
import EntityList from './EntityList';
import { EntitySchema } from './entity-schema';
import { Routes } from '../router/routes';

export interface EntitiesProps {
  entities: EntitySchema[];
  routes: Routes;
}

interface State {}

interface Props
  extends EntitiesProps,
    WithStyles<typeof styles>,
    RouteComponentProps<{
      entityAlias?: string;
    }> {}

const styles = theme => ({
  tabs: {
    marginBottom: theme.spacing.unit
  }
});

class Entities extends React.Component<Props, State> {
  state: State = {};

  componentWillReceiveProps(props) {
    const { entities, routes, match } = props;
    if (entities.length > 1 && match.params.entityAlias === 'undefined') {
      this.props.history.push(routes.entityRoot.url(entities[0].options.alias));
    }
  }

  render() {
    const { entities, routes, classes } = this.props;
    return (
      <div>
        <Tabs
          value={this.props.match.params.entityAlias}
          onChange={(e, value) => {
            this.props.history.push(routes.entityRoot.url(value));
          }}
          className={classes.tabs}
        >
          {entities.map(entity => (
            <Tab
              value={entity.options.alias}
              key={entity.options.alias}
              label={entity.options.displayName || entity.options.alias}
            />
          ))}
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps(state: AppState): EntitiesProps {
  return {
    entities: state.config.schema,
    routes: state.router.routes
  };
}

export default combineContainers(withStyles(styles), withRouter, connect(mapStateToProps))(
  Entities
) as React.ComponentType;
