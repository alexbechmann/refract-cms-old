import express from 'express';
import { refractCmsHandler, createPublicSchema } from '@refract-cms/server';
import config from '@consumer/config';
import serverConfigBuilder from '@consumer/config/server.config';
import '@babel/polyfill';

let assets: any;

const server = express();

async function start() {
  console.log(serverConfigBuilder);
  const serverConfig = await serverConfigBuilder();

  server
    .disable('x-powered-by')
    // .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
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
}

start();

export default server;
