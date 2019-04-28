import express from 'express';
import { refractCmsHandler, createPublicSchema } from '@refract-cms/server';
import config from '@consumer/config/refract.config';
import serverConfigBuilder from '@consumer/config/server.config';
import '@babel/polyfill';

const server = express();

serverConfigBuilder().then(serverConfig => {
  server
    .use(
      ...refractCmsHandler({
        serverConfig
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

    </head>
    <body>
        <div id="root"></div>
        <script src="http://localhost:3001/client.js" defer crossorigin></script>
    </body>
</html>`
      );
    });
});

export default server;
