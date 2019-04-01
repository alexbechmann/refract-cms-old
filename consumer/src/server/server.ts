import express from 'express';
import path from 'path';
import { refractCmsHandler, createPublicSchema, ImageModel } from '@refract-cms/server';
import config from '../refract-cms/refract.config';
import { RefractTypes } from '@refract-cms/core';
import { NewsArticleSchema } from '../refract-cms/news/news-article.schema';
import { ProductSchema } from '../refract-cms/products/product.schema';

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
      publicGraphQL: [
        createPublicSchema(ProductSchema, () => {
          return {
            ...ProductSchema.properties,
            someVar: {
              type: RefractTypes.string,
              resolve: product => `${product._id}_hello!`
            }
          };
        }),
        createPublicSchema(
          NewsArticleSchema,
          ({ resolveImageProperty, schema, resolveReference, resolveReferences }) => {
            return {
              ...schema.properties,
              imageModel: resolveImageProperty('image'),
              title: {
                type: RefractTypes.string,
                resolve: ({ title }) => (title ? title.toUpperCase() : '')
              },
              highlightedProduct: resolveReference(ProductSchema, 'highlightedProductId'),
              highlightedProducts: resolveReferences(ProductSchema, 'otherRelatedProductIds')
            };
          }
        )
      ]
    }
  })
);

app.get('/*', express.static(path.resolve(__dirname, '..', '..', 'dist')));

app.get('*', (req, res) => {
  const application = ''; // renderToString(<App />);
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
