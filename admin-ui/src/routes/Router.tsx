import * as React from 'react';
import { BrowserRouter, Switch, Route, RouteComponentProps, withRouter, Link } from 'react-router-dom';
import { EntityMetadata } from '../entities/entity-metadata';
import Entities from '../entities/Entities';
import { Provider, connect } from 'react-redux';
import { store } from '../state/root.store';
import { AppState } from '../state/app.state';
import { combineContainers } from 'combine-containers';
import EntityForm from '../entities/EntityForm';
import EntityList from '../entities/EntityList';
import { routes } from './routes';
import { ConnectedReduxProps } from '../state/connected-redux-props';
import { setBaseRoute } from './state/routes.actions';

export interface RouterProps {
  entities: EntityMetadata[];
  baseRouteSetup: boolean;
}

interface Props extends RouterProps, RouteComponentProps<{}>, ConnectedReduxProps {}

class Router extends React.Component<Props> {
  componentDidMount() {
    this.props.dispatch(setBaseRoute(this.props.match ? this.props.match.path : ''));
  }

  render() {
    const { match, entities, baseRouteSetup } = this.props;
    const RouterOrAny = match
      ? (props: any) => <BrowserRouter>{props.children}</BrowserRouter>
      : (props: any) => <div>{props.children}</div>;
    return baseRouteSetup ? (
      <RouterOrAny>
        <div>
          <Switch>
            <Route path={routes.entities.path()} component={Entities} />
          </Switch>
          <Switch>
            {entities.map(entity => {
              return (
                <Route
                  key={entity.options.alias}
                  path={routes.entityRoot.path(entity.options.alias)}
                  component={() =>
                    entity.options.maxOne ? <EntityForm entity={entity} /> : <EntityList entity={entity} />
                  }
                />
              );
            })}
          </Switch>
          <Switch>
            {entities.map(entity => {
              return (
                <Route
                  key={entity.options.alias}
                  exact
                  path={routes.entityEditById.path({
                    entityAlias: entity.options.alias
                  })}
                  component={() => <EntityForm entity={entity} />}
                />
              );
            })}
          </Switch>
        </div>
      </RouterOrAny>
    ) : (
      <React.Fragment />
    );
  }
}

function mapStateToProps(state: AppState): RouterProps {
  return {
    entities: state.config.entities,
    baseRouteSetup: state.routes.baseRouteSetup
  };
}

export default combineContainers(withRouter, connect(mapStateToProps))(Router) as React.ComponentType;
