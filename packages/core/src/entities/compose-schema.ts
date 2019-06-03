import { PropertyOptions } from '../properties/property-options';
import { EntitySchema } from './entity-schema';
import { EntityOptions } from './entity-options';
import { Omit } from '@material-ui/core';
import { Entity } from './entity.model';
import { ActualType } from '../properties/property-types';

function composeSchema<T = any>(args: {
  properties: { [K in keyof T]: PropertyOptions<T, T[K]> };
  options: EntityOptions<T>;
}) {
  type ObjectWithConstructorTypes = { [K in keyof T]: PropertyOptions<T, T[K]> };
  type Return = { [K in keyof ObjectWithConstructorTypes]: ActualType<ObjectWithConstructorTypes[K]['type']> };
  return {
    ...args,
    prototypes: {} as Return
  };
}
export default composeSchema;
