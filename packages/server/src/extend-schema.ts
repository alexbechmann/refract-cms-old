import { EntitySchema, Entity, PropertyType } from '@refract-cms/core';

export type Properties<TModel, TEntity extends Entity> = {
  [P in keyof TModel]: {
    type: PropertyType<P>;
    resolve: (entity: TEntity) => TModel[P] | Promise<TModel[P]>;
  }
};

export function extendSchema<TEntity extends Entity, TModel = any>(
  schema: EntitySchema<TEntity>,
  properties: Properties<TModel, TEntity>
  // resolve: (entity: TEntity) => TModel | Promise<TModel>
) {
  return {
    schema,
    properties
  };
}
