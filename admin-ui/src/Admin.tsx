import * as React from 'react';
import { getSchemaMetadata } from './schema/get-schema-metadata';
import { BrowserRouter, Switch, Route, RouteComponentProps, withRouter, Link } from 'react-router-dom';

export interface AdminProps {
  serverUrl: string;
  schemas: any[];
}

interface Props extends AdminProps, RouteComponentProps<{}> {}

class Admin extends React.Component<Props> {
  render() {
    const { match } = this.props;
    const RouterOrAny = match
      ? (props: any) => <BrowserRouter>{props.children}</BrowserRouter>
      : (props: any) => <div>{props.children}</div>;
    return (
      <div>
        <Link to={`${match ? match.url : ''}/dashboard`.replace('//', '/')}>Dashboard</Link>
        <RouterOrAny>
          <Switch>
            <Route path={`${match ? match.path : ''}/dashboard`} component={() => <Dashboard {...this.props} />} />
          </Switch>
        </RouterOrAny>
      </div>
    );
  }
}

class Dashboard extends React.Component<any> {
  render() {
    return (
      <div>
        sdfasfd
        {getSchemaMetadata(this.props.schemas).map(item => (
          <div key={item.options.alias}>
            <div> {item.options.displayName || item.options.alias}</div>
            <span>allowMultiple: {JSON.stringify(item.options.allowMultiple)}</span>
            <table>
              <tbody>
                {Object.keys(item.properties).map((key: string, index: number) => {
                  const prop = item.properties[key];
                  return (
                    <tr key={index}>
                      <td>{prop.displayName || key}</td>
                      <td>{this.renderEditor(prop)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    );
  }

  renderEditor(prop: any) {
    if (prop.editorComponent) {
      return <prop.editorComponent setValue={console.log} />;
    } else {
      return <React.Fragment />;
    }
  }
}
export default withRouter(Admin) as React.ComponentType<AdminProps>;
