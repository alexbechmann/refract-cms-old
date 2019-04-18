import { PropertyType, EntitySchema, RefractTypes, PropertyOptions, Entity } from '@refract-cms/core';
import {
  GraphQLString,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLList,
  GraphQLType,
  GraphQLSchema
} from 'graphql';
import { ShapeArgs, PropertyDescription } from '@refract-cms/core';
import { merge } from 'lodash';
import mongoose from 'mongoose';
import { ServerConfig } from '../server-config.model';
import { Properties, buildHelpers } from '../create-public-schema';
import { repositoryForSchema } from '../repository-for-schema';
import { getGraphQLQueryArgs, getMongoDbQueryResolver } from 'graphql-to-mongodb';
import { Db } from 'mongodb';
import { GraphQLDate } from 'graphql-iso-date';

export class PublicSchemaBuilder {
  types: GraphQLObjectType[] = [];

  constructor(private serverConfig: ServerConfig) {}

  buildEntityFromSchema(
    entitySchema: EntitySchema,
    prefixName: string = '',
    addResolvers: boolean,
    suffixName: string = ''
  ) {
    const extension = this.serverConfig.publicGraphQL.find(
      extension => extension.schema.options.alias === entitySchema.options.alias
    );

    const extensionProperties = extension
      ? extension.buildProperties(buildHelpers({ serverConfig: this.serverConfig, schema: entitySchema }))
      : null;

    const properties = extension ? extensionProperties : entitySchema.properties;
    const type = this.buildEntity(
      prefixName + entitySchema.options.alias + suffixName,
      properties,
      extension ? extensionProperties : null,
      addResolvers
    );
    return type;
  }

  buildSchema(schema: EntitySchema[]) {
    let queryFields = {};
    schema.forEach(entitySchema => {
      const type = this.buildEntityFromSchema(entitySchema, '', true);
      const repository = repositoryForSchema(entitySchema);

      queryFields = {
        ...queryFields,
        ...this.buildFieldQueries(entitySchema, repository, type)
      };
    });

    const query = new GraphQLObjectType({
      name: 'Query',
      fields: queryFields
    });

    return new GraphQLSchema({ query });
  }

  buildFieldQueries<TEntity extends Entity & mongoose.Document>(
    entitySchema: EntitySchema<TEntity>,
    repository: mongoose.Model<TEntity>,
    type: GraphQLObjectType
  ) {
    const typeWithoutResolvers = this.buildEntityFromSchema(entitySchema, '', false, 'Args');

    if (entitySchema.options.maxOne) {
      return {
        [`${entitySchema.options.alias}`]: {
          type,
          args: {},
          resolve: async (obj: any, {  }: any, context: any) => {
            return repository.findOne();
          }
        }
      };
    } else {
      return {
        [`${entitySchema.options.alias}GetById`]: {
          type,
          args: {
            id: { type: GraphQLString }
          },
          resolve: (_, { id }) => {
            return repository.findById({ _id: id });
          }
        },
        [`${entitySchema.options.alias}GetAll`]: {
          type: new GraphQLList(type),
          args: getGraphQLQueryArgs(typeWithoutResolvers),
          resolve: getMongoDbQueryResolver(type, async (filter, projection, options, obj, args, { db }: { db: Db }) => {
            return repository.find(filter).sort(options.sort);
          })
        }
      };
    }
  }

  buildType<T>(propertyName: string, propertyType: PropertyType<T>): GraphQLType {
    switch (propertyType.alias) {
      case 'String': {
        return GraphQLString;
      }
      case 'Date': {
        return GraphQLDate;
      }
      case 'Number': {
        return GraphQLFloat;
      }
      case 'Boolean': {
        return GraphQLBoolean;
      }
      case 'Shape': {
        return this.buildShape(propertyName, propertyType as PropertyDescription<T, 'Shape', ShapeArgs<T>>);
      }
      case 'Array': {
        const type = this.buildType(propertyName, propertyType.meta);
        return new GraphQLList(type);
      }
      // @ts-ignore
      case 'SchemaType': {
        // @ts-ignore
        return this.buildEntityFromSchema(propertyType.meta, '');
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
        return GraphQLString;
      }
    }
  }

  buildEntity<T extends Entity>(
    alias: string,
    properties: {
      [key: string]: PropertyOptions;
    },
    extensionProperties?: Properties<any, T>,
    addResolvers?: boolean
  ) {
    const shapeArgs = Object.keys(properties).reduce((acc, propertKey) => {
      acc[propertKey] = properties[propertKey].type;
      return acc;
    }, {}) as any;

    const shape = RefractTypes.shape(shapeArgs);

    const existingType = this.types.find(t => t.name === alias);

    if (existingType) {
      return existingType;
    }

    const type = new GraphQLObjectType({
      name: alias,
      fields: () =>
        Object.keys(shape.meta!).reduce(
          (acc, propertyKey) => {
            const propertyType: PropertyDescription<any, any, any> = shape.meta![propertyKey];
            const type = this.buildType(`${alias}${propertyKey}`, propertyType);
            acc[propertyKey] = {
              // @ts-ignore
              type
            };
            if (addResolvers && extensionProperties && extensionProperties[propertyKey]) {
              acc[propertyKey].resolve = extensionProperties[propertyKey].resolve;
              // @ts-ignore
              acc[propertyKey].dependencies = [];
            }
            // if (propertyType.alias === 'Ref') {
            //   const refEntitySchema: EntitySchema = propertyType.meta;
            //   acc[propertyKey].resolve = entity => {
            //     const ref = entity[propertyKey];
            //     if (ref) {
            //       return mongoose.models[refEntitySchema.options.alias].findById({ id: entity[propertyKey].entityId });
            //     } else {
            //       return null;
            //     }
            //   };
            // }
            return acc;
          },
          {
            _id: {
              type: GraphQLString,
              resolve: addResolvers ? entity => `${entity._id}` : undefined,
              // @ts-ignore
              dependencies: []
            }
          }
        )
    });

    this.types.push(type);

    return type;
  }

  buildShape<T>(propertyName: string, propertyType: PropertyDescription<T, 'Shape', ShapeArgs<T>>) {
    return new GraphQLObjectType({
      name: propertyName,
      fields: Object.keys(propertyType.meta!).reduce((acc, propertyKey) => {
        const type = this.buildType(`${propertyName}${propertyKey}`, propertyType.meta![propertyKey]);
        acc[propertyKey] = {
          type
        };
        return acc;
      }, {})
    });
  }
}
