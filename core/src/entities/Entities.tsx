import * as React from 'react';
import { PropertyOptions } from '../properties/property-options';
import { Tabs, Tab } from '@material-ui/core';
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

interface State {
  tabIndex: number;
}

interface Props extends EntitiesProps, RouteComponentProps<{}> {}

class Entities extends React.Component<Props, State> {
  state: State = {
    tabIndex: 0
  };

  componentDidMount() {
    const { entities, routes } = this.props;
    if (entities.length > 1) {
      //this.props.history.push(routes.entityRoot.url(entities[0].options.alias));
    }
  }

  render() {
    const { entities, routes } = this.props;
    return (
      <div>
        <Tabs
          value={this.state.tabIndex}
          onChange={(e, tabIndex) => {
            this.setState({
              tabIndex
            });
            this.props.history.push(routes.entityRoot.url(entities[tabIndex].options.alias));
          }}
        >
          {entities.map(entity => (
            <Tab key={entity.options.alias} label={entity.options.displayName || entity.options.alias} />
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

export default combineContainers(withRouter, connect(mapStateToProps))(Entities) as React.ComponentType;
