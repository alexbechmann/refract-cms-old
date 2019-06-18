import { Entity, EntitySchema } from '@refract-cms/core';
import mongoose from 'mongoose';

export function repositoryForSchema<TEntity extends Entity>(schema: EntitySchema<TEntity>) {
  type ModelType = mongoose.Document & TEntity;
  return mongoose.models[schema.options.alias] as mongoose.Model<ModelType>;
}
