import * as express from 'express';
import { Router } from 'express';
import { mongoHelper } from '../db/mongo-helper';
import { ObjectID } from 'bson';
import * as multer from 'multer';
import jimp = require('jimp');

var router = express.Router();

const storage = multer.diskStorage({
  destination: './files',
  filename(req, file, cb) {
    cb(null, `${file.originalname}`);
  }
});
const upload = multer({ storage });

router.get('/file/:id?', async (req, res) => {
  const db = await mongoHelper.db();
  const { id } = req.params;
  const entity = await db.collection('media').findOne({ _id: new ObjectID(id) });
  const img = await jimp.read(entity.path);
  img.cover(720, 480);
  const imgBuffer = await img.getBufferAsync(entity.mimetype);
  //var img = fs.readFileSync(entity.path);
  res.writeHead(200, { 'Content-Type': entity.mimetype });
  res.end(imgBuffer, 'binary');
});

router.post('/', upload.single('file'), async (req, res) => {
  const file = req.file;
  const db = await mongoHelper.db();
  await db.collection('media').insert(file);
  res.send(200);
});

router.get('/', async (req, res) => {
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

router.get('/:id', async (req, res) => {
  const db = await mongoHelper.db();
  const { id } = req.params;
  const entity = await db.collection('media').findOne({ _id: new ObjectID(id) });
  res.send(entity);
});

export default router as Router;
