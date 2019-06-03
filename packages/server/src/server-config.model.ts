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
}
