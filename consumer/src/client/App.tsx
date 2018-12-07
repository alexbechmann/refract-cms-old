import React from 'react';
import { Switch, Route, BrowserRouter, Link, RouteComponentProps } from 'react-router-dom';
import { Dashboard, createDashboard } from '@refract-cms/dashboard';
import config from '../refract-cms/refract.config';
import 'typeface-roboto';

const App = () => (
  <div>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={() => <Link to="/admin">Dashboard</Link>} />
        <Route path="/admin" component={createDashboard({ config, serverUrl: '/cms' })} />
      </Switch>
    </BrowserRouter>
  </div>
);

export default App;
