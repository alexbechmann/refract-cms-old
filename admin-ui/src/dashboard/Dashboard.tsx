import * as React from 'react';
import { getEntitiesWithMetadata } from '../schema/get-entities-with-metadata';
import { PropertyOptions } from '../schema/property-options';
import { Tabs, Tab } from '@material-ui/core';
import { Route, RouteComponentProps, withRouter } from 'react-router';
import { routes } from '../routes/routes';
import { combineContainers } from 'combine-containers';
import { AppState } from '../state/app.state';
import { connect } from 'react-redux';

export interface DashboardProps {
  entities: any[];
}

interface State {
  tabIndex: number;
}

interface Props extends DashboardProps, RouteComponentProps<{}> {}

class Dashboard extends React.Component<Props, State> {
  state: State = {
    tabIndex: 0
  };

  render() {
    const { entities } = this.props;
    return (
      <div>
        <Tabs
          value={this.state.tabIndex}
          onChange={(e, tabIndex) => {
            this.setState({
              tabIndex
            });
            this.props.history.push(routes.entityRoot.url(this.props.match, entities[tabIndex].options.alias));
          }}
        >
          {entities.map(entity => (
            <Tab key={entity.options.alias} label={entity.options.displayName || entity.options.alias} />
          ))}
        </Tabs>
        {entities.map(entity => {
          return (
            <Route
              key={entity.options.alias}
              exact
              path={routes.entityRoot.path(this.props.match, entity.options.alias)}
              component={() => <div>{entity.options.alias}</div>}
            />
          );
        })}
      </div>
    );
  }

  renderEditor(propertyKey: string, propertyOptions: PropertyOptions<any>) {
    if (propertyOptions.editorComponent) {
      return <propertyOptions.editorComponent propertyKey={propertyKey} value={''} setValue={console.log} />;
    } else {
      return <React.Fragment />;
    }
  }
}

function mapStateToProps(state: AppState): DashboardProps {
  console.log(state.config.entities);
  return {
    entities: state.config.entities
  };
}

export default combineContainers(withRouter, connect(mapStateToProps))(Dashboard) as React.ComponentType;

// {entities.map(entity => (
//   <div key={entity.options.alias}>
//     <div> {entity.options.displayName || entity.options.alias}</div>
//     <span>allowMultiple: {JSON.stringify(entity.options.allowMultiple)}</span>
//     <table>
//       <tbody>
//         {Object.keys(entity.properties).map((key: string, index: number) => {
//           const propertyOptions = entity.properties[key];
//           return (
//             <tr key={index}>
//               <td>{propertyOptions.displayName || key}</td>
//               <td>{this.renderEditor(key, propertyOptions)}</td>
//             </tr>
//           );
//         })}
//       </tbody>
//     </table>
//   </div>
// ))}
