import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Switch, Route, BrowserRouter, Link, RouteComponentProps } from 'react-router-dom';
import { Dashboard, createDashboard } from '@refract-cms/dashboard';
import config from '../refract-cms/refract.config';
import 'typeface-roboto';
import { apolloClient } from './graphql/apollo-client';
import { ApolloProvider } from 'react-apollo';

const Root = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/admin" component={createDashboard({ config, serverUrl: '/cms' })} />
      <Route path="/" component={App} />
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(<Root />, document.getElementById('app'));
