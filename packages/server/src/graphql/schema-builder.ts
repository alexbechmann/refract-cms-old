import { PropertyType, EntitySchema, RefractTypes, PropertyOptions, Entity } from '@refract-cms/core';
import { ShapeArgs, PropertyDescription } from '@refract-cms/core/src/properties/property-types';
import mongoose, { SchemaTypeOpts, Schema, SchemaType, mongo } from 'mongoose';
import { ServerConfig } from '../server-config.model';

export class SchemaBuilder {
  constructor() {}

  buildSchema(schema: EntitySchema[], serverConfig: ServerConfig) {
    schema.forEach(entitySchema => {
      this.configureEntitySchema(entitySchema);
    });
  }

  configureEntitySchema(entitySchema: EntitySchema) {
    delete mongoose.connection.models[entitySchema.options.alias];
    const definition = Object.keys(entitySchema.properties).reduce((acc, propertyKey) => {
      const typeDef = entitySchema.properties[propertyKey].type;
      acc[propertyKey] = {
        type: this.buildType(propertyKey, typeDef)
      };
      return acc;
    }, {}) as any;

    const EntitySchema = new mongoose.Schema(definition, { collection: entitySchema.options.mongoCollectionName });
    mongoose.model(entitySchema.options.alias, EntitySchema);
  }

  buildType<T>(propertyName: string, propertyType: PropertyType<T>): SchemaTypeOpts<any> | Schema | SchemaType {
    switch (propertyType.alias) {
      case 'String': {
        return String;
      }
      case 'Date': {
        return Date;
      }
      case 'Number': {
        return Number;
      }
      case 'Boolean': {
        return Boolean;
      }
      case 'Shape': {
        return this.schemaFromShape(propertyName, (propertyType as any) as PropertyDescription<
          T,
          'Shape',
          ShapeArgs<T>
        >);
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
