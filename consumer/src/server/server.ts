import express from 'express';
import path from 'path';
import { refractCmsHandler, createPublicSchema, resolveImageProperty, ImageModel } from '@refract-cms/server';
import config from '../refract-cms/refract.config';
import { NewsArticleEntity } from '../refract-cms/news/news-article.entity';
import { NewsArticleModel } from '../refract-cms/news/news-article.model';
import { RefractTypes } from '@refract-cms/core';
import { ProductSchema, Product } from '../refract-cms/products/product.model';
import { NewsArticleSchema } from '../refract-cms/news/news-article.schema';

const app = express();

app.use(
  ...refractCmsHandler({
    serverConfig: {
      config,
      rootPath: '/cms',
      mongoConnectionString: 'mongodb://localhost:27018/refract-consumer-example',
      filesPath: 'consumer/files/',
      auth: {
        adminCredentials: {
          username: 'admin',
          password: 'pw'
        },
        jwt: {
          issuer: 'consumer',
          secret: 'secret'
        }
      },
      publicGraphQL: ({ serverConfig }) => [
        createPublicSchema<Product, { someVar: string }>(ProductSchema, {
          ...ProductSchema.properties,
          someVar: {
            type: RefractTypes.string,
            resolve: product => `${product._id}_hello!`
          }
        }),
        createPublicSchema<NewsArticleEntity, NewsArticleModel>(NewsArticleSchema, {
          image: resolveImageProperty(serverConfig.rootPath, NewsArticleSchema.properties.image, ({ image }) => image),
          title: {
            type: RefractTypes.string,
            resolve: ({ title }) => title
          }
        })
      ]
    }
  })
);

app.get('/*', express.static(path.resolve(__dirname, '..', '..', 'dist')));

app.get('*', (req, res) => {
  const application = ''; // renderToString(<App />);
  const config = {
    umbracoUrl: 'https://localhost:44300',
    umbracoMasterUrl: 'https://localhost:44300',
    apiUrl: '',
    newsUrl: 'http://localhost:3000',
    searchApiUrl: '',
    newsBasePath: '/news'
  };
  const html = `<!doctype html>
    <html class="no-js" lang="">
        <head>
            <meta charset="utf-8">
            <meta http-equiv="x-ua-compatible" content="ie=edge">
            <title>Refract-CMS Consumer</title>
            <meta name="description" content="">
            <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body>
          <script>
            window.config = ${JSON.stringify(config)}
          </script>
            <div id="app">${application}</div>
            <script src="http://localhost:3001/client.js"></script>
        </body>
    </html>`;

  res.send(html);
});

export default app;
