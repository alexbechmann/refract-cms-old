import { PropertyType } from "@refract-cms/core";
import { GraphQLString, GraphQLFloat, GraphQLBoolean, GraphQLObjectType, GraphQLFieldConfig } from "graphql";
import graphql from 'graphql';
import { ShapeArgs, PropertyDescription } from "../../../../packages/core/src/properties/property-types";

class SchemaBuilder {
  buildSchema() {

  }

  buildType<T>(propertyName: string, propertyType: PropertyType<T>): GraphQLFieldConfig<any, any> {
    switch (propertyType.alias) {
      case "String":
      case "Date": {
        return { type: GraphQLString }
      }
      case "Number": {
        return { type: GraphQLFloat }
      }
      case "Boolean": {
        return { type: GraphQLBoolean }
      }
      case "Boolean": {
        return { type: GraphQLBoolean }
      }
      case "Shape": {
        return this.buildShape(propertyName, propertyType as PropertyDescription<T, 'Shape', ShapeArgs<T>>);
      }
      default: {
        return { type: GraphQLString }
      }
    }
  }

  public buildShape<T>(propertyName: string, propertyType: PropertyDescription<T, 'Shape', ShapeArgs<T>>) {
    return {
      type: new GraphQLObjectType({
        name: propertyName,
        fields: Object.keys(propertyType.meta!).reduce((acc, propertyKey) => {
          acc[propertyKey] = this.buildType(`${propertyName}${propertyKey}`, propertyType.meta![propertyKey])
          return acc;
        }, {})
      })
    };
  }
}

export const schemaBuilder = new SchemaBuilder();

// var userType = new graphql.GraphQLObjectType({
//   name: 'User',
//   fields: {
//     id: { type: graphql.GraphQLString },
//     name: { type: graphql.GraphQLString },
//   }
// });