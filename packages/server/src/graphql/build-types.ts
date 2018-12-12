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
  GraphQLFloat,
  GraphQLEnumType
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

  const enumValues = buildEnumValues('', propertyTypes);
  shapes.push(
    new GraphQLEnumType({
      name: `Enum${schemaName}`,
      values: enumValues
    })
  );

  const filterFields = buildFilterFields(`Filter${schemaName}`, propertyTypes);

  shapes.push(
    new GraphQLInputObjectType({
      name: `Filter${schemaName}`,
      fields: () => filterFields
    })
  );

  shapes.push(
    new GraphQLInputObjectType({
      name: `OrderBy${schemaName}`,
      fields: () => ({
        field: {
          type: `Enum${schemaName}` as any
        },
        direction: {
          type: `OrderByDirection` as any
        }
      })
    })
  );

  return [
    ...shapes,
    new GraphQLObjectType({
      name: schemaName,
      fields: () => ({
        _id: {
          type: GraphQLString
        },
        createDate: {
          type: GraphQLString
        },
        updateDate: {
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

function buildFields(
  type: 'type' | 'input' | 'enum',
  baseName: string,
  propertyTypes: { [key: string]: PropertyType<any> }
) {
  return Object.keys(propertyTypes).reduce((acc, propertyKey) => {
    const propertyType = propertyTypes[propertyKey];
    switch (propertyType.alias) {
      case 'Shape': {
        const name = baseName + propertyKey;
        const fields = buildFields(type, name, propertyType.meta!);
        switch (type) {
          case 'type': {
            shapes.push(
              new GraphQLObjectType({
                name,
                fields: () => fields
              })
            );
            break;
          }
          case 'input': {
            shapes.push(
              new GraphQLInputObjectType({
                name,
                fields: () => fields
              })
            );
          }
          default:
            break;
        }
        acc[propertyKey] = {
          type: name
        };
        break;
      }
      case 'Array': {
        const type = `[${graphRefractTypeMap[propertyType.meta!.alias]}]`;
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

function buildEnumValues(baseName: string, propertyTypes: { [key: string]: PropertyType<any> }) {
  const values = Object.keys(propertyTypes).reduce((acc, propertyKey) => {
    const propertyType = propertyTypes[propertyKey];
    switch (propertyType.alias) {
      case 'Shape': {
        const name = baseName + propertyKey + '_';
        const fields = buildEnumValues(name, propertyType.meta!);
        Object.keys(fields).forEach(key => {
          const field = fields[key];
          acc[field.value] = field;
        });
        break;
      }
      default: {
        const value = baseName + propertyKey;
        acc[value] = {
          value
        };
        break;
      }
    }

    return acc;
  }, {});
  return values;
}

function buildFilterFields(baseName: string, propertyTypes: { [key: string]: PropertyType<any> }) {
  const values = Object.keys(propertyTypes).reduce((acc, propertyKey) => {
    const propertyType = propertyTypes[propertyKey];
    switch (propertyType.alias) {
      case 'Shape': {
        const name = baseName + propertyKey;
        const fields = buildFilterFields(name, propertyType.meta!);
        shapes.push(
          new GraphQLInputObjectType({
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
        const name = baseName + propertyKey;
        shapes.push(
          new GraphQLInputObjectType({
            name,
            fields: () => ({
              contains: {
                type: graphRefractTypeMap[propertyType.meta!.alias]
              }
            })
          })
        );
        acc[propertyKey] = {
          type: name
        };
        break;
      }
      default: {
        const name = baseName + propertyKey;
        shapes.push(
          new GraphQLInputObjectType({
            name,
            fields: () => ({
              matches: {
                type: graphRefractTypeMap[propertyType.alias]
              }
            })
          })
        );
        acc[propertyKey] = {
          type: name
        };
        break;
      }
    }

    return acc;
  }, {});
  return values;
}
