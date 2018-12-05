export interface ServerConfig {
  mongoConnectionString: string;
  filesPath: string;
  auth: {
    adminCredentials: {
      username: string;
      password: string;
    },
    jwt: {
      issuer?: string;
      secret: string
    }
  }
}