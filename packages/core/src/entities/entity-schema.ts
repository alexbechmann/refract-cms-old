import { EntityOptions } from './entity-options';
import { PropertyOptions } from '../properties/property-options';
import { Entity } from './entity.model';

export interface EntitySchema<T = Entity> {
  options: EntityOptions<T>;
  properties: { [key: string]: PropertyOptions };
}
