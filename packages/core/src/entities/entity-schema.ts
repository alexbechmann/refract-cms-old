import { EntityOptions } from './entity-options';
import { Entity } from './entity.model';
import { PropertiesRecord } from './define-entity';

export interface EntitySchema<T extends Entity = any, TModel extends Entity = Entity> {
  options: EntityOptions<T>;
  properties: PropertiesRecord<T>;
}
