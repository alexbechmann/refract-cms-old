import * as React from 'react';
import { BrowserRouter, Switch, Route, RouteComponentProps, withRouter, Link } from 'react-router-dom';
import { routes } from './routes/routes';
import Entities from './entities/Entities';
import { Provider } from 'react-redux';
import { store } from './state/root.store';
import { AppState } from './state/app.state';

export interface AdminProps {}

interface Props extends AdminProps, RouteComponentProps<{}> {}

class Admin extends React.Component<Props> {
  render() {
    const { match } = this.props;
    const RouterOrAny = match
      ? (props: any) => <BrowserRouter>{props.children}</BrowserRouter>
      : (props: any) => <div>{props.children}</div>;
    return (
      <div>
        <Provider store={store}>
          <div>
            <Link to={routes.root.url(match)}>Admin</Link>
            <br />
            <Link to={routes.entities.url(match)}>Entities</Link>
            <RouterOrAny>
              <Switch>
                <Route path={routes.entities.path(match)} component={Entities} />
              </Switch>
            </RouterOrAny>
          </div>
        </Provider>
      </div>
    );
  }
}

export default withRouter(Admin) as React.ComponentType<AdminProps>;
