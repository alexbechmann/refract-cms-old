import { PropertyType, EntitySchema, RefractTypes, PropertyOptions, Entity } from '@refract-cms/core';
import { ShapeArgs, PropertyDescription } from '@refract-cms/core/src/properties/property-types';
import mongoose, { SchemaTypeOpts, Schema, SchemaType, mongo } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { schemaComposer } from 'graphql-compose';

export class SchemaBuilder {
  constructor() {}

  buildSchema(schema: EntitySchema[]) {
    schema.forEach(entitySchema => {
      this.configureEntitySchema(entitySchema);
    });
  }

  resetSchema() {
    Object.keys(mongoose.connection.models).forEach(key => {
      delete mongoose.connection.models[key];
    });
  }

  configureEntitySchema(entitySchema: EntitySchema) {
    const definition = Object.keys(entitySchema.properties).reduce((acc, propertyKey) => {
      const typeDef = entitySchema.properties[propertyKey].type;
      acc[propertyKey] = this.buildType(propertyKey, typeDef);
      return acc;
    }, {}) as any;

    const EntitySchema = new mongoose.Schema(definition);
    const Entity = mongoose.model(entitySchema.options.alias, EntitySchema);
    const customizationOptions = {};
    const EntityTypeComposer = composeWithMongoose(Entity, customizationOptions);

    schemaComposer.Query.addFields({
      [`${entitySchema.options.alias}ById`]: EntityTypeComposer.getResolver('findById'),
      [`${entitySchema.options.alias}ByIds`]: EntityTypeComposer.getResolver('findByIds'),
      [`${entitySchema.options.alias}One`]: EntityTypeComposer.getResolver('findOne'),
      [`${entitySchema.options.alias}Many`]: EntityTypeComposer.getResolver('findMany'),
      [`${entitySchema.options.alias}Count`]: EntityTypeComposer.getResolver('count'),
      [`${entitySchema.options.alias}Pagination`]: EntityTypeComposer.getResolver('pagination')
    });

    schemaComposer.Mutation.addFields({
      [`${entitySchema.options.alias}CreateOne`]: EntityTypeComposer.getResolver('createOne'),
      [`${entitySchema.options.alias}CreateMany`]: EntityTypeComposer.getResolver('createMany'),
      [`${entitySchema.options.alias}UpdateById`]: EntityTypeComposer.getResolver('updateById'),
      [`${entitySchema.options.alias}UpdateOne`]: EntityTypeComposer.getResolver('updateOne'),
      [`${entitySchema.options.alias}UpdateMany`]: EntityTypeComposer.getResolver('updateMany'),
      [`${entitySchema.options.alias}RemoveById`]: EntityTypeComposer.getResolver('removeById'),
      [`${entitySchema.options.alias}RemoveOne`]: EntityTypeComposer.getResolver('removeOne'),
      [`${entitySchema.options.alias}RemoveMany`]: EntityTypeComposer.getResolver('removeMany')
    });
  }

  buildType<T>(propertyName: string, propertyType: PropertyType<T>): SchemaTypeOpts<any> | Schema | SchemaType {
    switch (propertyType.alias) {
      case 'String':
      case 'Date': {
        return String;
      }
      case 'Number': {
        return Number;
      }
      case 'Boolean': {
        return Boolean;
      }
      case 'Shape': {
        return this.schemaFromShape(propertyName, propertyType as PropertyDescription<T, 'Shape', ShapeArgs<T>>);
      }
      case 'Array': {
        const type = this.buildType(propertyName, propertyType.meta);
        return [type];
      }
      // case 'Ref': {
      //   const shapeArgs = Object.keys(propertyType.meta.properties).reduce((acc, propertKey) => {
      //     acc[propertKey] = propertyType.meta.properties[propertKey].type;
      //     return acc;
      //   }, {}) as any;

      //   const shape = RefractTypes.shape(shapeArgs);
      //   return this.buildShape(propertyName, shape);
      // }
      default: {
        return String;
      }
    }
  }

  schemaFromShape<T>(propertyName: string, propertyType: PropertyDescription<T, 'Shape', ShapeArgs<T>>) {
    const definition = Object.keys(propertyType.meta!).reduce((acc, propertyKey) => {
      const type = this.buildType(`${propertyName}${propertyKey}`, propertyType.meta![propertyKey]);
      acc[propertyKey] = {
        type
      };
      return acc;
    }, {});
    return new mongoose.Schema(definition, {
      id: false
    });
  }
}
