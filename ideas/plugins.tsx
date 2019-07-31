import express from 'express';
import { ServerConfig, SchemaBuilder } from '@refract-cms/server';

interface ResolverPlugin<T extends PropertyType = any> {
  alias: string;
  buildFieldConfig: (
    args: {
      propertyKey: string;
      meta: any;
      serverConfig: ServerConfig;
      schemaBuilder: SchemaBuilder;
    }
  ) => GraphQLFieldConfig<any, RefractGraphQLContext>;
}

function createResolverPlugin<T extends PropertyType = any>(plugin: ResolverPlugin<T>) {
  return plugin;
}

interface Plugin {
  resolverPlugins: ResolverPlugin[];
  addExpressRouter: () => express.Router;
  events: {
    onSave?: () => void;
  };
}
