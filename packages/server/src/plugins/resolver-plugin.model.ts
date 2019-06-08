import { ResolvedPropertyOptions } from '../resolved-property-options';
import { PropertyType } from '@refract-cms/core';
import { ServerConfig } from '../server-config.model';
import { GraphQLObjectType, GraphQLFieldConfig } from 'graphql';
import { RefractGraphQLContext } from '../graphql/refract-graphql-context';
import { PublicSchemaBuilder } from 'src/graphql/public-schema.builder';

export type ResolverPlugin<T extends PropertyType = any> = {
  alias: string;
  buildFieldConfig: (
    args: {
      propertyKey: string;
      meta: any;
      serverConfig: ServerConfig;
      schemaBuilder: PublicSchemaBuilder;
    }
  ) => GraphQLFieldConfig<any, RefractGraphQLContext>;
};
