import express from 'express';
import { refractCmsHandler } from '@refract-cms/server';
import config from '@consumer/config/refract.config';
import serverConfig from '@consumer/config/server.config';
import path from 'path';
import '@babel/polyfill';

const server = express();

serverConfig.rootPath = '/cms';
serverConfig.config = config;

const scriptSrc = process.env.NODE_ENV === 'development' ? 'http://localhost:3001/client.js' : '/public/client.js';

server
  .use(
    ...refractCmsHandler({
      serverConfig
    })
  )
  .use('/public', express.static(path.join(__dirname, 'public')))
  .get('/*', (req: express.Request, res: express.Response) => {
    res.send(
      `<!doctype html>
<html lang="">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta charSet='utf-8' />
    <title>Refract-CMS Dashboard</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
</head>
<body>
    <div id="root"></div>
    <script src="${scriptSrc}" defer crossorigin></script>
</body>
</html>`
    );
  });

export default server;
