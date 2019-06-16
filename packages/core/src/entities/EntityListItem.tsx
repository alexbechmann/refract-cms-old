import React from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction, ListItemAvatar, Avatar } from '@material-ui/core';
import { EntitySchema } from './entity-schema';
import { Entity } from './entity.model';
import { ListItemProps } from '@material-ui/core/ListItem';
import { entityService } from './services/entity.service';
import { WithCoreContextProps } from '../context/with-core-context-props.model';
import { withCoreContext } from '../context/with-core-context';

interface EntityListItemProps extends ListItemProps<any> {
  schema: EntitySchema;
  entity: Entity;
  SecondaryAction?: JSX.Element;
}

interface Props extends EntityListItemProps, WithCoreContextProps {}

const EntityListItem = (props: Props) => {
  const { schema, entity, SecondaryAction, context } = props;
  const instanceDisplayProps = entityService.instanceDisplayPropsOrDefault(schema, context)(entity);
  return (
    <ListItem {...props as any}>
      <ListItemAvatar>
        <Avatar src={instanceDisplayProps.imageUrl}>
          {schema.options.icon ? <schema.options.icon /> : schema.options.alias[0].toUpperCase()}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primaryTypographyProps={{ noWrap: true }}
        secondaryTypographyProps={{ noWrap: true }}
        inset
        primary={instanceDisplayProps.primaryText}
        secondary={instanceDisplayProps.secondaryText}
      />
      {SecondaryAction && <ListItemSecondaryAction>{SecondaryAction}</ListItemSecondaryAction>}
    </ListItem>
  );
};

export default withCoreContext(EntityListItem) as React.ComponentType<EntityListItemProps>;
