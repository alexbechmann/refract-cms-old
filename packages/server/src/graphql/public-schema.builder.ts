import { PropertyType, EntitySchema, PropertyOptions, Entity } from '@refract-cms/core';
import {
  GraphQLString,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLList,
  GraphQLType,
  GraphQLSchema,
  GraphQLInputObjectType,
  GraphQLInputType,
  GraphQLInt,
  GraphQLScalarType
} from 'graphql';
import { merge } from 'lodash';
import mongoose from 'mongoose';
import { ServerConfig } from '../server-config.model';
// import { Properties, buildHelpers } from '../create-public-schema';
import { repositoryForSchema } from '../repository-for-schema';
import { getGraphQLQueryArgs, getMongoDbQueryResolver, getMongoDbFilter } from 'graphql-to-mongodb';
import { Db, ObjectId } from 'mongodb';
import { GraphQLDate, GraphQLDateTime } from 'graphql-iso-date';
import chalk from 'chalk';
import { MongoIdType } from './mongo-id.type';

export class PublicSchemaBuilder {
  types: GraphQLObjectType[] = [];
  inputTypes: GraphQLInputObjectType[] = [];

  constructor(private serverConfig: ServerConfig) {}

  buildEntityFromSchema(
    entitySchema: EntitySchema,
    prefixName: string = '',
    addResolvers: boolean,
    suffixName: string = '',
    useExtensions: boolean = true
  ) {
    // const extension = useExtensions
    //   ? this.serverConfig.publicGraphQL.find(extension => extension.schema.options.alias === entitySchema.options.alias)
    //   : null;

    const type = this.buildEntity(
      prefixName + entitySchema.options.alias + suffixName,
      entitySchema.properties,
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

      console.log(chalk.blue(`Added schema: ${entitySchema.options.displayName || entitySchema.options.alias}`));
    });

    const query = new GraphQLObjectType({
      name: 'Query',
      fields: queryFields
    });

    let mutationFields = {};
    schema.forEach(entitySchema => {
      const type = this.buildEntityFromSchema(entitySchema, '', true);
      const repository = repositoryForSchema(entitySchema);

      mutationFields = {
        ...mutationFields,
        ...this.buildFieldMutations(entitySchema, repository, type)
      };
    });

    const mutation = new GraphQLObjectType({
      name: 'Mutation',
      fields: mutationFields
    });

    return new GraphQLSchema({ query, mutation });
  }

  buildFieldQueries<TEntity extends Entity & mongoose.Document>(
    entitySchema: EntitySchema<TEntity>,
    repository: mongoose.Model<TEntity>,
    type: GraphQLObjectType
  ) {
    // const argsType = this.buildEntityFromSchema(entitySchema, '', false, 'Args', false);
    const entityType = this.buildEntityFromSchema(entitySchema, '', false, 'Entity', false);
    const args = getGraphQLQueryArgs(entityType);
    const resolvers = {
      [`${entitySchema.options.alias}Count`]: {
        type: GraphQLInt,
        args: {
          filter: args.filter
        },
        resolve: (_, { filter }) => repository.count(getMongoDbFilter(entityType, filter))
      },
      [`${entitySchema.options.alias}EntityFindById`]: {
        type: entityType,
        args: {
          id: { type: GraphQLString }
        },
        resolve: (_, { id }) => {
          return repository.findById(id);
        }
      },
      [`${entitySchema.options.alias}List`]: {
        type: new GraphQLList(type),
        args,
        resolve: getMongoDbQueryResolver(
          entityType,
          async (filter, projection, options, obj, args, { db }: { db: Db }) => {
            return repository
              .find(filter)
              .sort(options.sort)
              .limit(options.limit)
              .skip(options.skip);
          }
        )
      },
      [`${entitySchema.options.alias}EntityList`]: {
        type: new GraphQLList(entityType),
        args,
        resolve: getMongoDbQueryResolver(
          entityType,
          async (filter, projection, options, obj, args, { db }: { db: Db }) => {
            return repository
              .find(filter)
              .sort(options.sort)
              .limit(options.limit)
              .skip(options.skip);
          }
        )
      }
    };

    if (entitySchema.options.maxOne) {
      return {
        ...resolvers,
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
        ...resolvers,
        [`${entitySchema.options.alias}FindById`]: {
          type,
          args: {
            id: { type: GraphQLString }
          },
          resolve: (_, { id }) => {
            return repository.findById(id);
          }
        }
      };
    }
  }

  buildFieldMutations<TEntity extends Entity & mongoose.Document>(
    entitySchema: EntitySchema<TEntity>,
    repository: mongoose.Model<TEntity>,
    type: GraphQLObjectType
  ) {
    const inputType = this.buildInput(`${entitySchema.options.alias}Input`, entitySchema.properties);
    return {
      [`${entitySchema.options.alias}Create`]: {
        type,
        args: {
          record: { type: inputType }
        },
        resolve: (_, { record }, { userId }) => {
          if (!userId) {
            throw new Error('AuthenticationError');
          }
          return repository.create(record);
        }
      },
      [`${entitySchema.options.alias}Update`]: {
        type,
        args: {
          record: { type: inputType }
        },
        resolve: (_, { record }, { userId }) => {
          if (!userId) {
            throw new Error('AuthenticationError');
          }
          if (!record._id) {
            throw new Error('Missing _id');
          }
          return repository.findByIdAndUpdate(record._id, record);
        }
      },
      [`${entitySchema.options.alias}RemoveById`]: {
        type: GraphQLBoolean,
        args: {
          id: { type: GraphQLString }
        },
        resolve: async (_, { id }, { userId }) => {
          if (!userId) {
            throw new Error('AuthenticationError');
          }
          await repository.findByIdAndDelete(id);
          return true;
        }
      }
    };
  }

  buildType<T>(propertyName: string, propertyType: PropertyType): GraphQLType {
    switch (true) {
      case propertyType === String: {
        return GraphQLString;
      }
      case propertyType === Date: {
        return GraphQLDateTime;
      }
      case propertyType === Number: {
        return GraphQLFloat;
      }
      case propertyType === Boolean: {
        return GraphQLBoolean;
      }
      case propertyType instanceof Array: {
        const type = this.buildType(propertyName, propertyType[0]);
        return new GraphQLList(type);
      }
      case propertyType instanceof Object: {
        return this.buildShape(propertyName, propertyType as any);
      }

      // @ts-ignore
      // case 'SchemaType': {
      //   // @ts-ignore
      //   return this.buildEntityFromSchema(propertyType.meta, '');
      // }
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

  buildInputType<T>(propertyName: string, propertyType: PropertyType): GraphQLInputType {
    switch (true) {
      case propertyType === String: {
        return GraphQLString;
      }
      case propertyType === Date: {
        return GraphQLDateTime;
      }
      case propertyType === Number: {
        return GraphQLFloat;
      }
      case propertyType === Boolean: {
        return GraphQLBoolean;
      }
      case propertyType instanceof Array: {
        const type = this.buildInputType(propertyName, propertyType[0]);
        return new GraphQLList(type);
      }
      case propertyType instanceof Object: {
        return this.buildShapeInput(propertyName, propertyType as any);
      }

      // // @ts-ignore
      // case 'SchemaType': {
      //   // @ts-ignore
      //   return this.buildEntityFromSchema(propertyType.meta, '');
      // }
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

  buildInput<T extends Entity>(
    alias: string,
    properties: {
      [key: string]: PropertyOptions<any, any>;
    }
  ) {
    const existingType = this.types.find(t => t.name === alias);

    if (existingType) {
      return existingType;
    }

    const inputTypes = new GraphQLInputObjectType({
      name: alias,
      fields: () =>
        Object.keys(properties).reduce(
          (acc, propertyKey) => {
            const propertyType = properties[propertyKey].type;
            const type = this.buildInputType(`${alias}${propertyKey}`, propertyType);
            acc[propertyKey] = {
              type
            };
            return acc;
          },
          {
            _id: {
              type: MongoIdType
            }
          }
        )
    });

    this.inputTypes.push(inputTypes);
    return inputTypes;
  }

  buildEntity<T extends Entity>(
    alias: string,
    properties: {
      [key: string]: PropertyOptions<any, any>;
    },
    addResolvers?: boolean
  ) {
    const existingType = this.types.find(t => t.name === alias);

    if (existingType) {
      return existingType;
    }

    const type = new GraphQLObjectType({
      name: alias,
      fields: () =>
        Object.keys(properties).reduce(
          (acc, propertyKey) => {
            const propertyOptions = properties[propertyKey];
            const propertyType = propertyOptions.type;
            const type = this.buildType(`${alias}${propertyKey}`, propertyType);
            acc[propertyKey] = {
              // @ts-ignore
              type
            };
            if (addResolvers && propertyOptions.mode === 'resolve' && propertyOptions.resolve) {
              acc[propertyKey].resolve = propertyOptions.resolve;
              // @ts-ignore
              acc[propertyKey].dependencies = [];
            }

            return acc;
          },
          {
            _id: {
              type: MongoIdType
            }
          }
        )
    });

    this.types.push(type);

    return type;
  }

  buildShape<T>(propertyName: string, propertyType: { [K: string]: PropertyType }) {
    return new GraphQLObjectType({
      name: propertyName,
      fields: Object.keys(propertyType).reduce((acc, propertyKey) => {
        const type = this.buildType(`${propertyName}${propertyKey}`, propertyType[propertyKey]);
        acc[propertyKey] = {
          type
        };
        return acc;
      }, {})
    });
  }

  buildShapeInput<T>(propertyName: string, propertyType: { [K: string]: PropertyType }) {
    return new GraphQLInputObjectType({
      name: propertyName,
      fields: Object.keys(propertyType).reduce((acc, propertyKey) => {
        const type = this.buildInputType(`${propertyName}${propertyKey}`, propertyType[propertyKey]);
        acc[propertyKey] = {
          type
        };
        return acc;
      }, {})
    });
  }
}
