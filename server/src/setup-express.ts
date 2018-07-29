import { Request, Response, NextFunction, Application, Express } from 'express';
import * as express from 'express';
import { getAllEntities } from './register';
const path = require('path');
import * as cors from 'cors';

export default (app: any) => {
  app.use(cors());
  //app.use('/admin', express.static(path.resolve('./node_modules/@headless-cms/core/src/admin-ui/build')));
  app.get('/schema', (req: Request, res: Response) => {
    res.send(getAllEntities());
  });
};
