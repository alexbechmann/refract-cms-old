import { Config, PropertyType } from '@refract-cms/core';
import { ResolverPlugin } from './plugins/resolver-plugin.model';

export interface ServerConfig {
  config: Config;
  mongoConnectionString: string;
  filesPath: string;
  auth: {
    adminCredentials: {
      username: string;
      password: string;
    };
    jwt: {
      issuer?: string;
      secret: string;
    };
  };
  resolvers?: {
    [key: string]: {
      [key: string]: {
        type: PropertyType;
        resolve?: any;
      };
    };
  };
  resolverPlugins?: ResolverPlugin[];
}
