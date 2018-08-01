import * as React from 'react';
import { EntityMetadata } from './entity-metadata';
import RouteButton from '../shared/ui/RouteButton';
import { routes } from '../routes/routes';
import { withRouter, RouteComponentProps } from 'react-router';

export interface EntityListProps {
  entity: EntityMetadata;
}

interface Props extends EntityListProps, RouteComponentProps<{}> {}

class EntityList extends React.Component<Props> {
  render() {
    return (
      <div>
        <RouteButton
          to={routes.entityEditById.url({
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

export default withRouter(EntityList) as React.ComponentType<EntityListProps>;
