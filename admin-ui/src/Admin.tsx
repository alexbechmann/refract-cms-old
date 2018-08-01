import * as React from 'react';
import { BrowserRouter, Switch, Route, RouteComponentProps, withRouter, Link } from 'react-router-dom';
import { routes } from './routes/routes';
import Entities from './entities/Entities';
import { Provider } from 'react-redux';
import { store } from './state/root.store';
import { AppState } from './state/app.state';
import { combineContainers } from 'combine-containers';
import { EntityMetadata } from './entities/entity-metadata';
import EntityForm from './entities/EntityForm';
import EntityList from './entities/EntityList';
import { connect } from 'react-redux';
import Router from './routes/Router';

export interface AdminProps {}

interface Props extends AdminProps, RouteComponentProps<{}> {}

class Admin extends React.Component<Props> {
  render() {
    return (
      <div>
        <Provider store={store}>
          <div>
            <Router />
          </div>
        </Provider>
      </div>
    );
  }
}

export default Admin as React.ComponentType<AdminProps>;
