import * as React from 'react';
import { BrowserRouter, Switch, Route, RouteComponentProps, withRouter, Link } from 'react-router-dom';
import { EntitySchema } from '../entities/entity-schema';
import Entities from '../entities/Entities';
import { Provider, connect } from 'react-redux';
import { store } from '../state/root.store';
import { AppState } from '../state/app.state';
import { combineContainers } from 'combine-containers';
import EntityForm from '../entities/EntityForm';
import EntityList from '../entities/EntityList';
import { ConnectedReduxProps } from '../state/connected-redux-props';
import { setBaseRoute } from './state/router.actions';
import { Routes } from './routes';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import Media from '../media/Media';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../state/root.store';

interface Props extends ReturnType<typeof mapStateToProps>, RouteComponentProps<{}>, ConnectedReduxProps {}

class Router extends React.Component<Props> {
  componentDidMount() {
    this.props.dispatch(setBaseRoute(this.props.match ? this.props.match.path : ''));
  }

  render() {
    const { match, entities, routes } = this.props;
    // const RouterOrAny = match
    //   ? props => <ConnectedRouter>{props.children}</ConnectedRouter>
    //   : props => <ConnectedRouter history={history}>{props.children}</ConnectedRouter>;

    return routes ? (
      <ConnectedRouter history={history}>
        <div>
          <AppBar position="sticky">
            <Toolbar>
              <Button color="inherit" component={(props: any) => <Link {...props} to={routes.root.url()} />}>
                Dashboard
              </Button>
              <Button color="inherit" component={(props: any) => <Link {...props} to={routes.content.url()} />}>
                Content
              </Button>
              <Button color="inherit" component={(props: any) => <Link {...props} to={routes.media.url()} />}>
                Media
              </Button>
            </Toolbar>
          </AppBar>
          <Switch>
            <Route exact path={routes.root.path()} component={() => <Typography>Dashboard</Typography>} />
            <Route path={routes.content.path()} component={Entities} />
            <Route path={routes.media.path()} component={Media} />
          </Switch>
          <Switch>
            {entities.map(entity => {
              return (
                <Route
                  key={entity.options.alias}
                  exact
                  path={routes.entityRoot.path(entity.options.alias)}
                  component={() => <EntityList entity={entity} />}
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
      </ConnectedRouter>
    ) : (
      <React.Fragment />
    );
  }
}

function mapStateToProps(state: AppState) {
  return {
    entities: state.config.schema,
    routes: state.router.routes
  };
}

export interface RouterProps {
  rootPath: string;
}

export default combineContainers(withRouter, connect(mapStateToProps))(Router) as React.ComponentType<RouterProps>;
