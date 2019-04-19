import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import { refractCmsHandler, createPublicSchema } from '@refract-cms/server';
import config from '../refract-cms/refract.config';
import { ProductSchema } from '../refract-cms/products/product.schema';
import { NewsArticleSchema } from '../refract-cms/news/news-article.schema';
import '@babel/polyfill';
import { RefractTypes } from '@refract-cms/core';
import mongoose from 'mongoose';
import MongoMemoryServer from 'mongodb-memory-server';

let assets: any;

const syncLoadAssets = () => {
  assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
};
syncLoadAssets();

const server = express()
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))

  .get('/*', (req: express.Request, res: express.Response) => {
    res.send(
      `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <title>Razzle TypeScript</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${assets.client.css ? `<link rel="stylesheet" href="${assets.client.css}">` : ''}
          ${
            process.env.NODE_ENV === 'production'
              ? `<script src="${assets.client.js}" defer></script>`
              : `<script src="${assets.client.js}" defer crossorigin></script>`
          }
    </head>
    <body>
        <div id="root"></div>
    </body>
</html>`
    );
  });

async function start() {
  // @ts-ignore
  const mongod = new MongoMemoryServer();
  const uri = await mongod.getConnectionString();
  console.log(uri);
  server.use(
    ...refractCmsHandler({
      serverConfig: {
        config,
        rootPath: '/cms',
        mongoConnectionString: uri,
        filesPath: 'consumer/files/',
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
}

start();

export default server;
