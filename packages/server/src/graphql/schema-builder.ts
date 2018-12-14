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
import { ShapeArgs, PropertyDescription } from '../../../../packages/core/src/properties/property-types';
import { Repository } from '../persistance/repository.model';

export class SchemaBuilder {
  constructor(private repositoryBuilder: (entitySchema: EntitySchema<any>) => Repository<any>) {}

  buildSchema(schema: EntitySchema[]) {
    let queryFields = {};
    let mutationFields = {};

    schema.forEach(entitySchema => {
      const repository = this.repositoryBuilder(entitySchema);
      const type = this.buildEntity(entitySchema);
      queryFields = {
        ...queryFields,
        ...this.buildFieldQueries(entitySchema, repository, type)
      };
      mutationFields = {
        ...mutationFields,
        ...this.buildFieldMutations(entitySchema, repository, type)
      };
    });

    const query = new GraphQLObjectType({
      name: 'Query',
      fields: queryFields
    });

    const mutation = new GraphQLObjectType({
      name: 'Mutation',
      fields: mutationFields
    });

    return new GraphQLSchema({ query, mutation });
  }

  buildFieldQueries<TEntity extends Entity>(
    entitySchema: EntitySchema<TEntity>,
    repository: Repository<TEntity>,
    type: GraphQLObjectType
  ) {
    return {
      [`${entitySchema.options.alias}GetById`]: {
        type,
        args: {
          id: { type: GraphQLString }
        },
        resolve: (_, { id }) => {
          return repository.getById({ id });
        }
      },
      [`${entitySchema.options.alias}GetAll`]: {
        type,
        args: {
          id: { type: GraphQLString }
        },
        resolve: (obj: any, { filter = {}, skip = 0, limit = 999, orderBy }: any, context: any) => {
          return repository.getAll({ filter, skip, limit, orderBy });
        }
      }
    };
  }

  buildFieldMutations<TEntity extends Entity>(
    entitySchema: EntitySchema<TEntity>,
    repository: Repository<TEntity>,
    type: GraphQLObjectType
  ) {
    return {
      [`${entitySchema.options.alias}Create`]: {
        type,
        args: {
          id: { type: GraphQLString }
        },
        resolve: (_, { item }, context) => {
          return repository.insert(item);
        }
      },
      [`${entitySchema.options.alias}Update`]: {
        type,
        args: {
          id: { type: GraphQLString }
        },
        resolve: (_, { id, item }, context) => {
          return repository.update({ id, item });
        }
      },
      [`${entitySchema.options.alias}Delete`]: {
        type,
        args: {
          id: { type: GraphQLString }
        },
        resolve: (_, { id }, context) => {
          return repository.delete({ id });
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
      default: {
        return GraphQLString;
      }
    }
  }

  buildEntity<T>(entitySchema: EntitySchema<T>) {
    const shapeArgs = Object.keys(entitySchema.properties).reduce(
      (acc, propertKey) => {
        acc[propertKey] = entitySchema.properties[propertKey].type;
        return acc;
      },
      {
        _id: RefractTypes.string
      }
    ) as any;

    return this.buildShape(entitySchema.options.alias, RefractTypes.shape(shapeArgs));
  }

  buildShape<T>(propertyName: string, propertyType: PropertyDescription<T, 'Shape', ShapeArgs<T>>) {
    console.log('hi', propertyName);
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
