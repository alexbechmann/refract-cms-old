// import { createPublicSchema } from '@refract-cms/server';
import { CliServerConfig } from '@refract-cms/cli';
import { ProductSchema } from './products/product.schema';
import { NewsArticleSchema } from './news/news-article.schema';
import { createResolver } from '@refract-cms/server';
// import { ProductSchema } from './products/product.schema';
// import { NewsArticleSchema } from './news/news-article.schema';
// import { SettingsSchema } from './settings/settings.schema';
import path from 'path';
import { exampleServerPlugin } from './plugins/example-server-plugin';
// import next from 'next';

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
  },
  resolvers: {
    ...createResolver(NewsArticleSchema, {
      upperCaseTitle: {
        type: String,
        resolve: source => (source.title ? source.title.toUpperCase() : 'nothing')
      }
    })
  },
  resolverPlugins: [],
  configureExpress: app => {
    const dev = process.env.NODE_ENV !== 'production';
    //const nextApp = next({ dev });
    // const handle = nextApp.getRequestHandler();
    // nextApp.prepare().then(() => {
    //   app.get('*', (req, res) => {
    //     handle(req, res);
    //   });
    // });
  },
  codeGenOptions: {
    outputPath: path.resolve(process.cwd(), 'generated')
  },
  events: {
    onSchemaBuilt: () => console.log('hi from consumer')
  },
  plugins: [exampleServerPlugin]
};

export default serverConfig;
