import { EntityOptions } from './entity-options';
import { Entity } from './entity.model';
import { PropertiesRecord } from './define-entity';

export interface EntitySchema<TEntity extends Entity = any, TModel extends Entity = any> {
  options: EntityOptions<TEntity, TModel>;
  properties: PropertiesRecord<TEntity>;
}
