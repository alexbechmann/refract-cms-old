import { createPublicSchema, buildHelpers } from './create-public-schema';
import { Config } from '@refract-cms/core';

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
  publicGraphQL: ReturnType<typeof createPublicSchema>[];
}
