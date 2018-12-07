import {
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  printType,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLInputType,
  GraphQLNamedType,
  GraphQLScalarType,
  GraphQLFloat
} from 'graphql';
import { graphqlQueryHelper, PropertyOptions, PropertyType, EntitySchema } from '@refract-cms/core';

const graphRefractTypeMap = {
  [Date.name]: GraphQLString,
  [String.name]: GraphQLString,
  [Number.name]: GraphQLFloat,
  [Boolean.name]: GraphQLBoolean
};

let shapes: any[] = [];

export function buildTypes(schema: EntitySchema) {
  shapes = [];
  const propertyTypes = Object.keys(schema.properties).reduce((acc, p) => {
    acc[p] = schema.properties[p].type;
    return acc;
  }, {});

  const schemaName = graphqlQueryHelper.schemaName(schema.options.alias);
  const fields = buildFields('type', schemaName, propertyTypes);
  const inputSchemaName = `Input${schemaName}`;
  const inputFields = buildFields('input', inputSchemaName, propertyTypes);

  return [
    ...shapes,
    new GraphQLObjectType({
      name: schemaName,
      fields: () => ({
        _id: {
          type: GraphQLString
        },
        ...fields
      })
    }),
    new GraphQLInputObjectType({
      name: inputSchemaName,
      fields: () => ({
        _id: {
          type: GraphQLString
        },
        ...inputFields
      })
    })
  ];
}

function buildFields(type: 'type' | 'input', baseName: string, propertyTypes: { [key: string]: PropertyType<any> }) {
  return Object.keys(propertyTypes).reduce((acc, propertyKey) => {
    const propertyType = propertyTypes[propertyKey];
    switch (propertyType.alias) {
      case 'Shape': {
        const name = baseName + propertyKey;
        const fields = buildFields(type, name, propertyType.meta!);
        shapes.push(
          type === 'type'
            ? new GraphQLObjectType({
                name,
                fields: () => fields
              })
            : new GraphQLInputObjectType({
                name,
                fields: () => fields
              })
        );
        acc[propertyKey] = {
          type: name
        };
        break;
      }
      case 'Array': {
        const type = `[${graphRefractTypeMap[propertyType.meta!] || GraphQLString}]`;
        acc[propertyKey] = {
          type
        };
        break;
      }
      default: {
        acc[propertyKey] = {
          type: graphRefractTypeMap[propertyType.alias]
        };
        break;
      }
    }
    return acc;
  }, {});
}
