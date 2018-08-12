import express, { Router } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { mongoHelper } from './db/mongo-helper';
import { ObjectID, ObjectId } from 'bson';

var router = express.Router();

router.get('/', (req, res) => {
  res.send('cms');
});

router.use(cors());
router.use(bodyParser.json());

router.post('/content/:alias', async (req, res) => {
  const entity = req.body;
  const db = await mongoHelper.db();
  const { alias } = req.params;
  const insertedEntity = await db.collection(alias).insert(entity);
  res.send({
    params: req.params,
    insertedEntity
  });
});

router.put('/content/:alias/:id?', async (req, res) => {
  const entity = req.body;
  const db = await mongoHelper.db();
  const { alias, id } = req.params;
  delete entity._id;
  const updateResult = await db.collection(alias).updateOne(
    {
      _id: new ObjectID(id)
    },
    { $set: entity }
  );
  res.send({
    params: req.params,
    insertedEntity: updateResult.result
  });
});

router.delete('/content/:alias/:id?', async (req, res) => {
  const db = await mongoHelper.db();
  const { alias, id } = req.params;
  const deleteResult = await db.collection(alias).deleteOne({ _id: new ObjectID(id) });
  res.send({
    params: req.params,
    deleteResult
  });
});

router.get('/content/:alias', async (req, res) => {
  const mongoQuery = mongoHelper.createMongoQueryFromOdataUrl(req.url);
  const db = await mongoHelper.db();
  const { alias } = req.params;
  const results = await db
    .collection(alias)
    .find(mongoQuery.query)
    .limit(mongoQuery.limit)
    .skip(mongoQuery.skip)
    .sort(mongoQuery.sort)
    .toArray();
  res.send(results);
});

router.get('/content/:alias/:id?', async (req, res) => {
  const db = await mongoHelper.db();
  const { alias, id } = req.params;
  const entity = await db.collection(alias).findOne({ _id: new ObjectID(id) });
  res.send(entity);
});

export default router as Router;
