import { CliServerConfig } from '@refract-cms/cli';
import { NewsArticleSchema } from './news/news-article.schema';
import { createResolver } from '@refract-cms/server';
import path from 'path';
import { exampleServerPlugin } from './plugins/example-server-plugin';
import { activeDirectoryServerPlugin } from '@refract-cms/plugin-active-directory-auth/dist/src/server';
import { fileSystemImageServerPlugin } from '@refract-cms/plugin-file-system-image/dist/src/server';
import { codeGenServerPlugin } from '@refract-cms/plugin-code-gen/dist/src/server';
import gql from 'graphql-tag';

const serverConfig: CliServerConfig = {
  mongoConnectionString: 'mongodb://localhost:27018/cli-consumer',
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
};

export default serverConfig;
