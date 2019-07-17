import express from 'express';
import { refractCmsHandler, ServerConfig } from '@refract-cms/server';
const config = require('@consumer/config/refract.config').default;
const serverConfig: CliServerConfig & ServerConfig = require('@consumer/config/server.config').default;
import path from 'path';
import '@babel/polyfill';
import cors from 'cors';
import { CliServerConfig } from '@refract-cms/cli';

const server = express();

serverConfig.rootPath = '/cms';
serverConfig.config = config;

const scriptSrc = process.env.NODE_ENV === 'development' ? 'http://localhost:3001/client.js' : '/public/client.js';

const handler = refractCmsHandler({
  serverConfig
});

if (serverConfig.configureExpress) {
  serverConfig.configureExpress(server);
}

server
  .use(handler[0], cors(), handler[1])
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
