// import { createPublicSchema } from '@refract-cms/server';
import { CliServerConfig } from '@refract-cms/cli';
// import { RefractTypes } from '@refract-cms/core';
// import { ProductSchema } from './products/product.schema';
// import { NewsArticleSchema } from './news/news-article.schema';
// import { SettingsSchema } from './settings/settings.model';

const serverConfig: CliServerConfig = {
  mongoConnectionString: 'mongodb://localhost:27018/cli-consumer',
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
  }
};

export default serverConfig;
