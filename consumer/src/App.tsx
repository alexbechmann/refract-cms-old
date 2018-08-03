import * as React from 'react';
import { Admin } from '@firestore-cms/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div>
         <BrowserRouter>
          <Switch>
            <Route path={`/admin`} component={Admin} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
