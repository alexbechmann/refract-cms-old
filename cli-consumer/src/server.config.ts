import { configureCliServer } from '@refract-cms/cli';
import { NewsArticleSchema } from './news/news-article.schema';
import { createResolver } from '@refract-cms/server';
import path from 'path';
import { exampleServerPlugin } from './plugins/example-server-plugin';
//@ts-ignore
import { activeDirectoryServerPlugin } from '@refract-cms/plugin-active-directory-auth/server';
//@ts-ignore
import { fileSystemImageServerPlugin } from '@refract-cms/plugin-file-system-image/server';
//@ts-ignore
import { codeGenServerPlugin } from '@refract-cms/plugin-code-gen/server';
import gql from 'graphql-tag';
import dotenv from 'dotenv';

dotenv.config();

export default configureCliServer({
  mongoConnectionString: process.env.MONGO_URL,
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
    // app.get('*', (req, res) => {
    //   res.send('frontend here');
    // });
  },
  events: {
    onSchemaBuilt: () => console.log('hi from consumer')
  },
  plugins: [
    exampleServerPlugin,
    activeDirectoryServerPlugin,
    fileSystemImageServerPlugin({
      filesPath: 'files/'
    }),
    codeGenServerPlugin({
      outputPath: path.resolve(process.cwd(), 'generated'),
      queries: [
        gql`
          query NewsArticleCount {
            newsArticleCount
          }
        `
      ]
    })
  ]
});
