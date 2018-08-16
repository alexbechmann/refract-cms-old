import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Router } from 'express';
import * as cors from 'cors';
import entityRouter from './entities/entity.router';
import mediaRouter from './media/media.router';

var router = express.Router();

router.get('/', (req, res) => {
  res.send('cms');
});

router.use(cors());
router.use(bodyParser.json());

router.use('/entities', entityRouter);
router.use('/media', mediaRouter);

export default router as Router;
