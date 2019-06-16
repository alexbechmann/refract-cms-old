import { EntitySchema } from '../entities/entity-schema';
import gql from 'graphql-tag';
import { PropertyType } from '../properties/property-types';
import { isBasicPropertyType } from '..';

class GraphqlQueryHelper {
  schemaName(alias: string) {
    return this.firstLetterToUpper(alias);
  }

  schemaNameForProperty(alias: string, propertyKey: string) {
    return `${this.firstLetterToUpper(alias)}${this.firstLetterToUpper(propertyKey)}`;
  }

  getAllQueryWithAllFields(
    schema: EntitySchema,
    filters?: {
      orderByField: string;
      orderByDirection: 'ASC' | 'DESC';
    }
  ) {
    const propertyTypes = Object.keys(schema.properties).reduce((acc, p) => {
      acc[p] = schema.properties[p].type;
      return acc;
    }, {});

    const queryArgs =
      filters && filters.orderByField && filters.orderByDirection
        ? `(sort: {${filters.orderByField}: ${filters.orderByDirection}})`
        : ``;
    return gql`
      {
        items: ${schema.options.alias}EntityList${queryArgs} {
          _id
          ${this.buildProperties(propertyTypes)}
        }
      }
    `;
  }

  buildProperties(properties: { [key: string]: PropertyType }): string {
    return Object.keys(properties).map(propertyKey => {
      const propertyType = properties[propertyKey];
      if (
        isBasicPropertyType(propertyType) ||
        (propertyType instanceof Array && isBasicPropertyType(propertyType[0]))
      ) {
        return propertyKey;
      } else {
        const t = propertyType instanceof Array ? propertyType[0] : propertyType;
        return `
        ${propertyKey} {
          ${this.buildProperties(t as any)}
        }
        `;
      }
    }).join(`
  `);
  }

  getByIdQueryWithAllFields(schema: EntitySchema, id: string) {
    const propertyTypes = Object.keys(schema.properties).reduce((acc, p) => {
      acc[p] = schema.properties[p].type;
      return acc;
    }, {});
    return gql`
      {
        item: ${schema.options.alias}EntityFindById(id: "${id}") {
          _id
          ${this.buildProperties(propertyTypes)}
        }
      }
    `;
  }

  firstLetterToUpper(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
}

export const graphqlQueryHelper = new GraphqlQueryHelper();
