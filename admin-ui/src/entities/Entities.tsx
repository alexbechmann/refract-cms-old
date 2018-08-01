import * as React from 'react';
import { getEntitiesWithMetadata } from './get-entities-with-metadata';
import { PropertyOptions } from '../properties/property-options';
import { Tabs, Tab } from '@material-ui/core';
import { Route, RouteComponentProps, withRouter } from 'react-router';
import { routes } from '../routes/routes';
import { combineContainers } from 'combine-containers';
import { AppState } from '../state/app.state';
import { connect } from 'react-redux';
import EntityForm from './EntityForm';
import EntityList from './EntityList';
import { EntityMetadata } from './entity-metadata';

export interface EntitiesProps {
  entities: EntityMetadata[];
}

interface State {
  tabIndex: number;
}

interface Props extends EntitiesProps, RouteComponentProps<{}> {}

class Entities extends React.Component<Props, State> {
  state: State = {
    tabIndex: 0
  };

  componentDidMount() {
    const { entities } = this.props;
    if (entities.length > 1) {
      this.props.history.push(routes.entityRoot.url(this.props.match, entities[0].options.alias));
    }
  }

  render() {
    const { entities } = this.props;
    console.log(this.props.match);
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
              component={() =>
                entity.options.maxOne ? <EntityForm entity={entity} /> : <EntityList entity={entity} />
              }
            />
          );
        })}
        {entities.map(entity => {
          return (
            <Route
              key={entity.options.alias}
              exact
              path={routes.entityEditById.path(this.props.match, {
                entityAlias: entity.options.alias
              })}
              component={() => <EntityForm entity={entity} />}
            />
          );
        })}
      </div>
    );
  }
}

function mapStateToProps(state: AppState): EntitiesProps {
  return {
    entities: state.config.entities
  };
}

export default combineContainers(withRouter, connect(mapStateToProps))(Entities) as React.ComponentType;
