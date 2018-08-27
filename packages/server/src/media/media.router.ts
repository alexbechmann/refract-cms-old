import * as express from 'express';
import { Router } from 'express';
import { mongoHelper } from '../db/mongo-helper';
import { ObjectID } from 'bson';
import * as multer from 'multer';
import jimp = require('jimp');
import { GridFSBucket } from 'mongodb';
import * as fs from 'fs';
import * as toStream from 'buffer-to-stream';
import { ImageProcessArgs } from '@refract-cms/domain';

var router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('file'), async (req, res) => {
  const file = req.file;
  const db = await mongoHelper.db();
  const img = await jimp.read(file.buffer);
  const size = {
    height: img.getHeight(),
    width: img.getWidth()
  };
  var bucket = new GridFSBucket(db, {
    bucketName: 'media'
  });
  toStream(file.buffer)
    .pipe(
      bucket.openUploadStream(undefined, {
        metadata: {
          mimetype: file.mimetype,
          size
        }
      })
    )
    .on('error', res.sendStatus.bind(500))
    .on('finish', () => {
      res.sendStatus(200);
    });
});

type ImageProcessArgsQuery = { [P in keyof ImageProcessArgs]: string };

router.get('/file/:id?', async (req, res) => {
  const defaultImageProcessArgsQuery: ImageProcessArgsQuery = {
    x: '0',
    y: '0',
    width: '0',
    height: '0'
  };
  const imageProcessArgs: ImageProcessArgsQuery = {
    ...defaultImageProcessArgsQuery,
    ...req.query
  };
  const db = await mongoHelper.db();
  const { id } = req.params;
  const entity = await db.collection('media.files').findOne({ _id: new ObjectID(id) });
  if (entity) {
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
      if ('width' in req.query && 'height' in req.query) {
        const { x, y, width, height, flip } = imageProcessArgs;
        await img.crop(parseInt(x), parseInt(y), parseInt(width), parseInt(height));
        if (flip) {
          img.flip(true, true);
        }
      }
      const imgBuffer = await img.getBufferAsync(entity.metadata.mimetype);
      res.writeHead(200, { 'Content-Type': entity.metadata.mimetype });
      res.end(imgBuffer, 'binary');
    });
  } else {
    res.send(404);
  }
});

export default router as Router;
