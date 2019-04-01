import { PropertyType, EntitySchema, RefractTypes, PropertyOptions, Entity } from '@refract-cms/core';
import {
  GraphQLString,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLList,
  GraphQLType,
  GraphQLSchema,
  GraphQLInt,
  getNamedType
} from 'graphql';
import { ShapeArgs, PropertyDescription } from '@refract-cms/core';
import { merge } from 'lodash';
import mongoose from 'mongoose';
import { ServerConfig } from '../server-config.model';
import { Properties, buildHelpers } from '../create-public-schema';
import { repositoryForSchema } from '../repository-for-schema';

const namedTypes: { [key: string]: GraphQLType } = {};

class PublicSchemaBuilder {
  buildSchema(schema: EntitySchema[], serverConfig: ServerConfig) {
    let queryFields = {};

    schema.forEach(entitySchema => {
      const repository = repositoryForSchema(entitySchema);
      const extension = serverConfig.publicGraphQL.find(
        extension => extension.schema.options.alias === entitySchema.options.alias
      );

      const extensionProperties = extension
        ? extension.buildProperties(buildHelpers({ serverConfig, schema: entitySchema }))
        : null;

      const properties = extension ? extensionProperties : entitySchema.properties;
      const type = this.buildEntity(entitySchema.options.alias, properties, extension ? extensionProperties : null);

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
        args: {
          skip: { type: GraphQLInt },
          limit: { type: GraphQLInt }
        },
        resolve: async (obj: any, { filter = {}, skip = 0, limit = 999, orderBy }: any, context: any) => {
          return repository
            .find(filter)
            .skip(skip)
            .limit(limit);
        }
      }
    };
  }

  buildType<T>(propertyName: string, propertyType: PropertyType<T>): GraphQLType {
    switch (propertyType.alias) {
      case 'String':
      case 'Date': {
        return GraphQLString;
      }
      case 'Number': {
        return GraphQLFloat;
      }
      case 'Boolean': {
        return GraphQLBoolean;
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
      case 'TypeName': {
        // @ts-ignore
        console.log(namedTypes, namedTypes[propertyType.meta]);
        return namedTypes[propertyType.meta];
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
    extensionProperties?: Properties<any, T>
  ) {
    const shapeArgs = Object.keys(properties).reduce((acc, propertKey) => {
      acc[propertKey] = properties[propertKey].type;
      return acc;
    }, {}) as any;

    const shape = RefractTypes.shape(shapeArgs);

    const type = new GraphQLObjectType({
      name: alias,
      fields: Object.keys(shape.meta!).reduce(
        (acc, propertyKey) => {
          const propertyType: PropertyDescription<any, any, any> = shape.meta![propertyKey];
          const type = this.buildType(`${alias}${propertyKey}`, propertyType);
          acc[propertyKey] = {
            type
          };
          if (extensionProperties && extensionProperties[propertyKey]) {
            acc[propertyKey].resolve = extensionProperties[propertyKey].resolve;
          }
          if (propertyType.alias === 'Ref') {
            const refEntitySchema: EntitySchema = propertyType.meta;
            acc[propertyKey].resolve = entity => {
              const ref = entity[propertyKey];
              if (ref) {
                return mongoose.models[refEntitySchema.options.alias].findById({ id: entity[propertyKey].entityId });
              } else {
                return null;
              }
            };
          }
          return acc;
        },
        {
          _id: {
            type: GraphQLString,
            resolve: entity => `${entity._id}`
          }
        }
      )
    });
    namedTypes[alias] = type;
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

export const publicSchemaBuilder = new PublicSchemaBuilder();
