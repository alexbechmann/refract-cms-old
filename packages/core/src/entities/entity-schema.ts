import { EntityOptions } from './entity-options';
import { PropertyOptions } from '../properties/property-options';
import { Entity } from './entity.model';

export type EntitySchema<T = Entity> = {
  options: EntityOptions<T>;
  properties: { [P in keyof T]: PropertyOptions<T[P]> };
};
