import { PropertyType, EntitySchema, RefractTypes } from "@refract-cms/core";
import { GraphQLString, GraphQLFloat, GraphQLBoolean, GraphQLObjectType, GraphQLList, GraphQLType } from "graphql";
import graphql from 'graphql';
import { ShapeArgs, PropertyDescription } from "../../../../packages/core/src/properties/property-types";

class SchemaBuilder {
  buildSchema() {

  }

  buildType<T>(propertyName: string, propertyType: PropertyType<T>): GraphQLType {
    switch (propertyType.alias) {
      case "String":
      case "Date": {
        return GraphQLString
      }
      case "Number": {
        return GraphQLFloat
      }
      case "Boolean": {
        return GraphQLBoolean
      }
      case "Boolean": {
        return GraphQLBoolean
      }
      case "Shape": {
        return this.buildShape(propertyName, propertyType as PropertyDescription<T, 'Shape', ShapeArgs<T>>);
      }
      case "Array": {
        const type = this.buildType(propertyName, propertyType.meta);
        return new GraphQLList(type)
      }
      default: {
        return GraphQLString
      }
    }
  }

  public buildEntity<T>(entitySchema: EntitySchema<T>) {
    const shapeArgs = Object.keys(entitySchema.properties).reduce((acc, propertKey) => {
      acc[propertKey] = entitySchema.properties[propertKey].type
      return acc;
    }, {})

    return this.buildShape(entitySchema.options.alias, RefractTypes.shape(shapeArgs))
  }

  public buildShape<T>(propertyName: string, propertyType: PropertyDescription<T, 'Shape', ShapeArgs<T>>) {
    return new GraphQLObjectType({
      name: propertyName,
      fields: Object.keys(propertyType.meta!).reduce((acc, propertyKey) => {
        const type = this.buildType(`${propertyName}${propertyKey}`, propertyType.meta![propertyKey]);
        acc[propertyKey] = {
          type
        }
        return acc;
      }, {})
    })
  };
}

export const schemaBuilder = new SchemaBuilder();