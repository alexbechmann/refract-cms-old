import express, { Router } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { mongoHelper } from './db/mongo-helper';

var router = express.Router();

router.get('/', (req, res) => {
  res.send('cms');
});

router.use(cors());
router.use(bodyParser.json());

router.post('/content/:alias/:id?', async (req, res) => {
  const entity = req.body;
  console.log(entity);
  const db = await mongoHelper.db();
  const { alias, id } = req.params;
  const insertedEntity = await db.collection(alias).insert(entity);
  res.send({
    params: req.params,
    insertedEntity
  });
});

export default router as Router;
