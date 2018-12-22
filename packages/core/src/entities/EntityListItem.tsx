import React from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction, ListItemAvatar, Avatar } from '@material-ui/core';
import { EntitySchema } from './entity-schema';
import { Entity } from './entity.model';
import { ListItemProps } from '@material-ui/core/ListItem';
import { entityService } from './services/entity.service';

interface EntityListItemProps extends ListItemProps {
  schema: EntitySchema<any>;
  entity: Entity;
  SecondaryAction?: JSX.Element;
}

interface Props extends EntityListItemProps {}

const EntityListItem = (props: Props) => {
  const { schema, entity, SecondaryAction } = props;
  const instanceDisplayProps = entityService.instanceDisplayPropsOrDefault(schema)(entity);
  return (
    <ListItem {...props}>
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

export default EntityListItem as React.ComponentType<EntityListItemProps>;
