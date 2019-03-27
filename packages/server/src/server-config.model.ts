import { createPublicSchema } from './create-public-schema';

export interface ServerConfig {
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
  publicGraphql: (config: ServerConfig) => ReturnType<typeof createPublicSchema>[];
}
