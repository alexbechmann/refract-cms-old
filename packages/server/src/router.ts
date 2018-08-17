import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Router } from 'express';
import * as cors from 'cors';
import entityRouter from './entities/entity.router';
import mediaRouter from './media/media.router';

var router = express.Router();
const routePrefix = '/refract';

router.use(cors());
router.use(bodyParser.json());

router.get(`${routePrefix}/`, (req, res) => {
  res.send(`refract api`);
});
router.use(`${routePrefix}/entities`, entityRouter);
router.use(`${routePrefix}/media`, mediaRouter);

export default router as Router;
