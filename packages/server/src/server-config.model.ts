import { extendSchema } from './extend-schema';

export interface ServerConfig {
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
  // resolvers: {
  //   [key: string]: {
  //     [key: string]: PropertyOptions;
  //   };
  // };
  schemaExtensions: ReturnType<typeof extendSchema>[];
}
