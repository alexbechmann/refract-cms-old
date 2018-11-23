import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Router } from 'express';
import * as cors from 'cors';
import entityRouter from './entities/entity.router';
import mediaRouter from './media/media.router';
import { getCurrentConfig } from './config/config';
import { buildGraphqlRouter } from './graphql/build-graphql-router';

export const buildRouter = (path: string) => {
  var router = express.Router();

  router.use(cors());
  router.use(bodyParser.json());

  router.get(`/`, (req, res) => {
    res.send(`refract api`);
  });
  router.use(`/entities`, entityRouter);
  router.use(`/graphql`, buildGraphqlRouter(getCurrentConfig()));
  router.use(`/media`, mediaRouter);

  return [path, router];
};
