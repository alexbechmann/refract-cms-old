import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import * as graphqlHTTP from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { getCurrentConfig, Config } from '../config/config';
import { merge } from 'lodash';
import { printType, GraphQLInt, GraphQLObjectType } from 'graphql';

export const buildGraphqlRouter = (config: Config) => {
  const router = express.Router();
  const baseResolvers = {
    Query: {
      getNumber: () => 4
    }
  };

  const entityGraphQLTypes = config.schema.map(schema => {
    const fields = {};
    Object.keys(schema.properties).map(propertyKey => {
      const property = schema.properties[propertyKey];
      fields[propertyKey] = {
        type: property.type
      };
    });
    return {
      schema: [
        printType(
          new GraphQLObjectType({
            name: schema.options.alias,
            fields: () => fields
          })
        ),
        `
      extend type Query {
        get${schema.options.alias}: [${schema.options.alias}] 
      }
      `
      ].join(`
    `),
      resolvers: {
        Query: {
          [`get${schema.options.alias}`]: (obj: any, { id }: any, context: any) => {
            return Promise.resolve([{}]);
          }
        }
      }
    };
  });

  const baseDefaultTypes = `
  type Query {
    getNumber: Int 
  }
  `;

  const typeDefs = [baseDefaultTypes, ...entityGraphQLTypes.map(t => t.schema)];
  const resolvers = merge(baseResolvers, ...entityGraphQLTypes.map(t => t.resolvers));

  const graphqlSchema = makeExecutableSchema({
    typeDefs,
    resolvers
  });

  router.use(
    '/graphql',
    graphqlHTTP({
      schema: graphqlSchema,
      graphiql: true
    })
  );

  return router;
};
