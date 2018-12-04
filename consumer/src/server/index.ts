import express from 'express';
import path from 'path';
import { refractCmsHandler } from '@refract-cms/server';
import config from '../refract-cms/refract.config';

const app = express();

app.use(
  ...refractCmsHandler({
    rootPath: '/cms',
    config,
    serverConfig: {
      mongoConnectionString: 'mongodb://localhost:27018/refract-consumer-example',
      filesPath: 'files/'
    }
  })
);

app.get('/*', express.static(path.resolve(__dirname, '..', '..', 'dist')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client', 'public', 'index.html'));
});

app.listen(2048, () => {
  console.log('Server listening');
});
