import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { refractCmsHandler } from '@refract-cms/server';
import { config } from '../refract-config/refract.config';

const app = express();

app.use(
  ...refractCmsHandler({
    rootPath: `/cms`,
    config,
    serverConfig: {
      mongoConnectionString: `mongodb://localhost:27019/refract-cms-basic-example`,
      filesPath: 'files/',
      auth: {
        adminCredentials: {
          username: 'admin',
          password: 'pw'
        },
        jwt: {
          issuer: 'consumer',
          secret: 'secret'
        }
      }
    }
  })
);

app.get('*', (req, res) => {
  const application = ''; // renderToString(<App />);

  const html = `<!doctype html>
    <html class="no-js" lang="">
        <head>
            <meta charset="utf-8">
            <meta http-equiv="x-ua-compatible" content="ie=edge">
            <title>Refract-CMS Demo</title>
            <meta name="description" content="">
            <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body>
            <div id="root">${application}</div>
            <script src="http://localhost:3001/client.js"></script>
        </body>
    </html>`;

  res.send(html);
});

export default app;
