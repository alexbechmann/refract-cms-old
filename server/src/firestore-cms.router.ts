import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Router } from 'express';
import { mongoHelper } from './db/mongo-helper';
import { ObjectID } from 'bson';
import * as cors from 'cors';
import * as multer from 'multer';
import * as fs from 'fs';

var router = express.Router();

const storage = multer.diskStorage({
  destination: './files',
  filename(req, file, cb) {
    cb(null, `${file.originalname}`);
  }
});
const upload = multer({ storage });

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

router.get('/media/file/:id?', async (req, res) => {
  const db = await mongoHelper.db();
  const { id } = req.params;
  const entity = await db.collection('media').findOne({ _id: new ObjectID(id) });
  var img = fs.readFileSync(entity.path);
  res.writeHead(200, { 'Content-Type': entity.mimetype });
  res.end(img, 'binary');
});

router.post('/media', upload.single('file'), async (req, res) => {
  const file = req.file;
  const db = await mongoHelper.db();
  await db.collection('media').insert(file);
  res.send(200);
});

router.get('/media', async (req, res) => {
  //const mongoQuery = mongoHelper.createMongoQueryFromOdataUrl(req.url);
  const db = await mongoHelper.db();
  const results = await db
    .collection('media')
    .find()
    // .find(mongoQuery.query)
    // .limit(mongoQuery.limit)
    // .skip(mongoQuery.skip)
    // .sort(mongoQuery.sort)
    .toArray();
  res.send(results);
});

router.get('/media/:id', async (req, res) => {
  const db = await mongoHelper.db();
  const { id } = req.params;
  const entity = await db.collection('media').findOne({ _id: new ObjectID(id) });
  res.send(entity);
});

export default router as Router;
