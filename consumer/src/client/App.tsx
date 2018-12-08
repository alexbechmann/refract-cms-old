import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { apolloClient } from './graphql/apollo-client';
import { ApolloProvider } from 'react-apollo';
import Home from './home/Home';
import News from './news/News';
import Products from './products/Products';
import Menu from './menu/Menu';
import { CssBaseline } from '@material-ui/core';

const App = () => (
  <ApolloProvider client={apolloClient}>
    <div>
      <CssBaseline />
      <Menu />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/news" component={News} />
        <Route path="/products" component={Products} />
      </Switch>
    </div>
  </ApolloProvider>
);

export default App;
