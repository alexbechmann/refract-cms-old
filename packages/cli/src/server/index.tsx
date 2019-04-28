import express from 'express';
import { refractCmsHandler, createPublicSchema } from '@refract-cms/server';
import config from '@consumer/config/refract.config';
// import serverConfigBuilder from '@consumer/config/server.config';
import '@babel/polyfill';
// const serverConfigBuilder = require('@consumer/config/server.config');

const server = express();

server.get('/hi', (req, res) => res.send('hi4'));

async function start() {
  console.log('async15', new Date(), config);
  //console.log(require('@consumer/config/server.config'), 'hi', refractCmsHandler);
  //const serverConfigBuilder = require('@consumer/config/server.config').default;

  //const serverConfig = await serverConfigBuilder();
  //console.log({ serverConfig });

  server
    //.disable('x-powered-by');
    // .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
    // .use(
    //   ...refractCmsHandler({
    //     serverConfig
    //   })
    // );
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
}

start();

export default server;
