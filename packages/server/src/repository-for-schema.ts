import { Entity, EntitySchema } from '@refract-cms/core';
import mongoose from 'mongoose';

export function repositoryForSchema<TEntity extends Entity>(schema: EntitySchema<TEntity>) {
  return mongoose.models[schema.options.alias];
}
