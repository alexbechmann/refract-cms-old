import { PropertyOptions } from '../properties/property-options';
import { EntitySchema } from './entity-schema';
import { EntityOptions } from './entity-options';
import { Omit } from '@material-ui/core';
import { Entity } from './entity.model';

export type PropertiesRecord<T> = Omit<{ [P in keyof T]: PropertyOptions<T[P]> }, '_id' | 'createDate' | 'updateDate'>;

const defineEntity = <T extends Entity, TModel extends Entity = T>({
  options,
  properties
}: {
  options: EntityOptions<T, TModel>;
  properties: PropertiesRecord<T>;
}) => {
  const entityMetadata: EntitySchema<T, TModel> = {
    options,
    properties: properties
  };
  return entityMetadata;
};

export default defineEntity;
