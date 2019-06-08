import { Config, PropertyType } from '@refract-cms/core';

type ResolverPlugin = () => any;

export interface ServerConfig {
  config: Config;
  rootPath: string;
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
