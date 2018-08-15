import * as React from 'react';
import { Admin } from '@firestore-cms/core';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Products from './products/Products';
import './App.css';
import { Button } from '@material-ui/core';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path={`/`} exact component={Products} />
            <Route path={`/admin`} component={Admin} />
          </Switch>
        </BrowserRouter>
        <Button component={(props: any) => <Link {...props} />}>Open admin panel</Button>
      </div>
    );
  }
}

export default App;
