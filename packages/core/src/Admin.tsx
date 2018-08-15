import * as React from 'react';
import { Provider } from 'react-redux';
import { store } from './state/root.store';
import Router from './router/Router';
import { withStyles, WithStyles } from '@material-ui/core';

export interface AdminProps {}

const styles = {
  '@global': {
    body: {
      margin: 0,
      padding: 0
    }
  }
};

interface Props extends AdminProps, WithStyles<typeof styles> {}

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

export default withStyles(styles)(Admin) as React.ComponentType<AdminProps>;
