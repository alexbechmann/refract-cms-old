import { createPublicSchema, buildHelpers, Helpers, Properties } from './create-public-schema';
import { Config, EntitySchema } from '@refract-cms/core';

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
  publicGraphQL: { schema: EntitySchema<any, any>; buildProperties: (helpers: Helpers<any>) => Properties<any, any> }[];
}
