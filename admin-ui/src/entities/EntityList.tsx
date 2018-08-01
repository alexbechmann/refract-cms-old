import * as React from 'react';
import { EntityMetadata } from './entity-metadata';
import RouteButton from '../shared/ui/RouteButton';
import { withRouter, RouteComponentProps } from 'react-router';
import { AppState } from '../state/app.state';
import { connect } from 'react-redux';
import { combineContainers } from 'combine-containers';
import { Routes } from '../router/routes';

export interface EntityListProps {
  routes: Routes;
}

interface Props extends EntityListProps, RouteComponentProps<{}>, EntityListPropsExtended {}

class EntityList extends React.Component<Props> {
  render() {
    return (
      <div>
        <RouteButton
          to={this.props.routes.entityEditById.url({
            id: 'create',
            entityAlias: this.props.entity.options.alias
          })}
        >
          New
        </RouteButton>
        <br />
        list of {this.props.entity.options.alias}
      </div>
    );
  }
}

export interface EntityListPropsExtended {
  entity: EntityMetadata;
}

function mapStateToProps(state: AppState): EntityListProps {
  return {
    routes: state.router.routes
  };
}

export default combineContainers(withRouter, connect(mapStateToProps))(EntityList) as React.ComponentType<
  EntityListPropsExtended
>;
