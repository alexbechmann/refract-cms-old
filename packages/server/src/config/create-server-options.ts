import { ServerOptions } from './server-options.model';
import merge from 'lodash/merge';
import produce from 'immer';
import { ServerOptionsArgs } from './server-options-args.model';
import { ServerConfig } from './server-config.model';

export function buildServerOptions(serverConfig: ServerConfig): ServerOptions {
  const serverOptionsConfigs: ServerOptionsArgs[] = [serverConfig, ...serverConfig.plugins];
  const { resolverPlugins, resolvers, config }: ServerOptionsArgs = serverOptionsConfigs.reduce<ServerOptionsArgs>(
    merge,
    {} as any
  );
  return {
    config: {
      ...config,
      rootPath: serverConfig.config.rootPath
    },
    resolverPlugins,
    schemas: config.schema,
    resolvers,
    events: Array.prototype.concat(serverOptionsConfigs.map(o => o.events)).filter(Boolean),
    routers: [] // Array.prototype.concat(serverOptionsConfigs.map(o => o.addExpressRouter()))
  };
}
