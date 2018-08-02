import * as React from 'react';
import { EntitySchema } from './entity-schema';
import { withRouter, RouteComponentProps } from 'react-router';
import { AppState } from '../state/app.state';
import { connect } from 'react-redux';
import { combineContainers } from 'combine-containers';
import { Routes } from '../router/routes';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

export interface EntityListProps {
  routes: Routes;
}

interface Props extends EntityListProps, RouteComponentProps<{}>, EntityListPropsExtended {}

class EntityList extends React.Component<Props> {
  render() {
    return (
      <div>
        <Button
          component={props => (
            <Link
              to={this.props.routes.entityEditById.url({
                id: 'create',
                entityAlias: this.props.entity.options.alias
              })}
            />
          )}
        >
          New
        </Button>
        <br />
        list of {this.props.entity.options.alias}
      </div>
    );
  }
}

export interface EntityListPropsExtended {
  entity: EntitySchema;
}

function mapStateToProps(state: AppState): EntityListProps {
  return {
    routes: state.router.routes
  };
}

export default combineContainers(withRouter, connect(mapStateToProps))(EntityList) as React.ComponentType<
  EntityListPropsExtended
>;
