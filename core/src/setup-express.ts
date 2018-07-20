import { Request, Response, NextFunction, Application, Express } from 'express';
import * as ExpressImport from 'express';
const path = require('path');

export default (app: any) => {
  const uiPath = path.resolve('./node_modules/@headless-cms/core/src/admin-ui/build');
  console.log(uiPath);
  app.use('/', ExpressImport.static(uiPath));
};
