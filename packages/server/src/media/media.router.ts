import * as express from 'express';
import { Router } from 'express';
import { mongoHelper } from '../db/mongo-helper';
import { ObjectID } from 'bson';
import * as multer from 'multer';
import jimp = require('jimp');
import { GridFSBucket } from 'mongodb';
import * as fs from 'fs';
import * as toStream from 'buffer-to-stream';

var router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('file'), async (req, res) => {
  const file = req.file;
  const db = await mongoHelper.db();
  var bucket = new GridFSBucket(db, {
    bucketName: 'media'
  });
  toStream(file.buffer)
    .pipe(
      bucket.openUploadStream(undefined, {
        metadata: {
          mimetype: file.mimetype
        }
      })
    )
    .on('error', res.sendStatus.bind(500))
    .on('finish', () => {
      res.sendStatus(200);
    });
});

router.get('/file/:id?', async (req, res) => {
  const db = await mongoHelper.db();
  const { id } = req.params;
  var bucket = new GridFSBucket(db, {
    bucketName: 'media'
  });
  const stream = bucket.openDownloadStream(new ObjectID(id));
  var buffers = [];
  stream.on('data', data => {
    buffers.push(data);
  });
  stream.on('end', async () => {
    const entity = await db.collection('media.files').findOne({ _id: new ObjectID(id) });
    var buffer = Buffer.concat(buffers);
    const img = await jimp.read(buffer);
    // img.cover(720, 480);
    const imgBuffer = await img.getBufferAsync(entity.metadata.mimetype);
    res.writeHead(200, { 'Content-Type': entity.metadata.mimetype });
    res.end(imgBuffer, 'binary');
  });
});

export default router as Router;
