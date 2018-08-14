import * as React from 'react';
import { Tabs, Tab, LinearProgress, WithStyles, withStyles } from '@material-ui/core';
import { RouteComponentProps, withRouter } from 'react-router';
import { combineContainers } from 'combine-containers';
import { AppState } from '../state/app.state';
import { connect } from 'react-redux';
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
    const { entities, routes, classes, match, history } = this.props;
    return match.params.entityAlias ? (
      <div>
        <Tabs
          value={match.params.entityAlias}
          onChange={(e, value) => {
            history.push(routes.entityRoot.url(value));
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
    ) : (
      <LinearProgress />
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
