import { EntityOptions } from './entity-options';
import { Entity } from './entity.model';
import { PropertiesRecord } from './define-entity';

export interface EntitySchema<T extends Entity = any> {
  options: EntityOptions<T>;
  properties: PropertiesRecord<T>;
}
