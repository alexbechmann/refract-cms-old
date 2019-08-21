import dotenv from 'dotenv';
import { CliServerConfig } from '@refract-cms/cli';

const env = dotenv.config().parsed;

const serverConfig: CliServerConfig = {
  mongoConnectionString: env.MONGO_URI,
  filesPath: 'files/',
  auth: {
    adminCredentials: {
      username: 'admin',
      password: 'pw'
    },
    jwt: {
      issuer: 'consumer',
      secret: 'secret1'
    }
  },
  plugins: []
};

export default serverConfig;
