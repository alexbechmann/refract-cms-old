import { EntityOptions } from './entity-options';
import { Entity } from './entity.model';
import { PropertiesRecord } from './define-entity';

export interface EntitySchema<T = Entity> {
  options: EntityOptions<T>;
  properties: PropertiesRecord<T>;
}
