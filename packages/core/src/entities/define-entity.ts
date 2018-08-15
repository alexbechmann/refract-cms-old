import { PropertyOptions } from '../properties/property-options';
import { EntitySchema } from './entity-schema';
import { EntityOptions } from './entity-options';
import { Omit } from '@material-ui/core';
import { Entity } from '..';

type PropertiesRecord<T> = Omit<{ [P in keyof T]: PropertyOptions<T[P]> }, '_id'>;

const defineEntity = <T extends Entity>(options: EntityOptions<T>) => (properties: PropertiesRecord<T>) => {
  const entityMetadata: EntitySchema = {
    options,
    properties
  };
  return entityMetadata;
};

export default defineEntity;
