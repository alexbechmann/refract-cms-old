import { PropertyType } from '@refract-cms/core';
import { ResolverPlugin } from '../plugins/resolver-plugin.model';
import { ServerOptions } from './server-options.model';
import { Events } from './events.model';

export interface ServerOptionsArgs extends Partial<Pick<ServerOptions, 'resolvers' | 'resolverPlugins'>> {
  events?: Events;
}
