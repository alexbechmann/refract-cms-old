import { Request, Response, NextFunction, Application, Express } from 'express';
import * as express from 'express';
import * as cors from 'cors';

export default (app: any) => {
  app.use(cors());
  app.get('/:alias/:id', (req: Request, res: Response) => {
    res.send({});
  });
};
