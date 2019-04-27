import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import { refractCmsHandler, createPublicSchema } from '@refract-cms/server';
import config from '@consumer/config';
// import { ProductSchema } from '../refract-cms/products/product.schema';
// import { NewsArticleSchema } from '../refract-cms/news/news-article.schema';
import '@babel/polyfill';
import { RefractTypes } from '@refract-cms/core';
import mongoose from 'mongoose';
import seed from './seed';
// import { SettingsSchema } from '../refract-cms/settings/settings.model';

let assets: any;

const syncLoadAssets = () => {
  assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
};
syncLoadAssets();

const server = express();

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .use(
    ...refractCmsHandler({
      serverConfig: {
        config,
        rootPath: '/cms',
        mongoConnectionString: process.env.MONGO_URI,
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
        publicGraphQL: []
      }
    })
  )
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

export default server;
