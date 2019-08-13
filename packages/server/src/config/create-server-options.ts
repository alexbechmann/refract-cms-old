import { ServerOptions } from './server-options.model';
import merge from 'lodash/merge';
import produce from 'immer';
import { ServerOptionsArgs } from './server-options-args.model';
import { ServerConfig } from './server-config.model';
import { EntitySchema } from '@refract-cms/core';

export function buildServerOptions(serverConfig: ServerConfig): ServerOptions {
  const serverOptionsConfigs: ServerOptionsArgs[] = [serverConfig, ...serverConfig.plugins];
  const { resolverPlugins, resolvers, config }: ServerOptionsArgs = serverOptionsConfigs.reduce<ServerOptionsArgs>(
    merge,
    {} as any
  );
  const schemas = serverOptionsConfigs.reduce<EntitySchema[]>((acc, current) => {
    acc = produce(acc, draft => {
      for (const entitySchema of current.config.schema) {
        acc.push(entitySchema);
      }
    });
    return acc;
  }, []);

  return {
    config: {
      ...config,
      rootPath: serverConfig.config.rootPath
    },
    resolverPlugins,
    schemas,
    resolvers,
    events: Array.prototype.concat(serverOptionsConfigs.map(o => o.events)).filter(Boolean),
    routers: [] // Array.prototype.concat(serverOptionsConfigs.map(o => o.addExpressRouter()))
  };
}
