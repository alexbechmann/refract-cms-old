import { EntitySchema } from '../entities/entity-schema';
import gql from 'graphql-tag';
import { PropertyType } from '../properties/property-types';

class GraphqlQueryHelper {
  schemaName(alias: string) {
    return this.firstLetterToUpper(alias);
  }

  schemaNameForProperty(alias: string, propertyKey: string) {
    return `${this.firstLetterToUpper(alias)}${this.firstLetterToUpper(propertyKey)}`;
  }

  getAllQueryWithAllFields(schema: EntitySchema) {
    const propertyTypes = Object.keys(schema.properties).reduce((acc, p) => {
      acc[p] = schema.properties[p].type;
      return acc;
    }, {});
    console.log(`
    {
      items: ${schema.options.alias}Many {
        _id
        ${this.buildProperties(propertyTypes)}
      }
    }
  `);
    return gql(`
      {
        items: ${schema.options.alias}Many {
          _id
          ${this.buildProperties(propertyTypes)}
        }
      }
    `);
  }

  buildProperties(properties: { [key: string]: PropertyType<any> }): string {
    return Object.keys(properties).map(propertyKey => {
      const propertyType = properties[propertyKey];
      if (propertyType.alias === 'Shape') {
        console.log('shape', propertyKey, propertyType.meta);
        return `
        ${propertyKey} {
          ${this.buildProperties(propertyType.meta!)}
        }
        `;
      } else {
        return propertyKey;
      }
    }).join(`
  `);
  }

  getByIdQueryWithAllFields(schema: EntitySchema, id: string) {
    const propertyTypes = Object.keys(schema.properties).reduce((acc, p) => {
      acc[p] = schema.properties[p].type;
      return acc;
    }, {});
    return gql(`
      {
        item: ${schema.options.alias}ById(_id: "${id}") {
          _id
          ${this.buildProperties(propertyTypes)}
        }
      }
    `);
  }

  firstLetterToUpper(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

export const graphqlQueryHelper = new GraphqlQueryHelper();
