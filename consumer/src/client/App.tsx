import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createDashboard } from '@refract-cms/dashboard';
import { config } from '../refract-config/refract.config';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider, graphql } from 'react-apollo';
import { CssBaseline } from '@material-ui/core';
import News from './news/News';
import Products from './products/Products';
import { Link } from 'react-router-dom';

const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: `/cms/graphql` }),
  cache: new InMemoryCache({
    addTypename: false
  })
});

const DemoUI = () => (
  <ApolloProvider client={apolloClient}>
    <CssBaseline />
    <News />
    <Products />
    <Link target="_blank" to="/admin">
      Go to dashboard to add/edit some data
    </Link>
  </ApolloProvider>
);

const App = () => (
  <div>
    <BrowserRouter>
      <Switch>
        <Route path="/admin" component={createDashboard({ config, serverUrl: '/cms' })} />
        <Route path="/" component={DemoUI} />
      </Switch>
    </BrowserRouter>
  </div>
);

export default App;
