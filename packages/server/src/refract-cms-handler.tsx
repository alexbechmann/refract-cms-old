import * as express from 'express';
import graphqlHTTP from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { Dashboard } from '@refract-cms/dashboard';
import { Config, graphqlQueryHelper, FileModel, Crop, defineEntity } from '@refract-cms/core';
import { merge } from 'lodash';
import { printType } from 'graphql';
import { MongoClient, Db, ObjectId } from 'mongodb';
import { ServerConfig } from './server-config.model';
import { RequestHandlerParams } from 'express-serve-static-core';
import multer from 'multer';
import jimp from 'jimp';
import { authService } from './auth/auth.service';
import uniqueString from 'unique-string';
import fs from 'fs';
import { SchemaBuilder } from './graphql/schema-builder';
import mongoose from 'mongoose';
import { schemaComposer } from 'graphql-compose';
import { publicSchemaBuilder } from './graphql/public-schema.builder';
import { requireAuth } from './auth/require-auth.middleware';

const refractCmsHandler = ({
  rootPath,
  config,
  serverConfig
}: {
  rootPath: string;
  config: Config;
  serverConfig: ServerConfig;
}) => {
  const router = express.Router();
  const storage = multer.diskStorage({
    destination: serverConfig.filesPath,
    filename(req, file, cb) {
      console.log(file);
      cb(null, `${uniqueString()}_${file.originalname}`);
    }
  });
  const upload = multer({ storage });

  mongoose.connect(serverConfig.mongoConnectionString);
  const schemaBuilder = new SchemaBuilder();
  schemaBuilder.buildSchema(config.schema, serverConfig);
  const schema = schemaComposer.buildSchema();

  router.use(
    '/graphql',
    // requireAuth,
    graphqlHTTP((req, res) => ({
      schema,
      graphiql: true,
      context: {
        userId: req.headers.authorization
          ? authService.verifyAccessToken(req.headers.authorization!, serverConfig).nameid
          : null
      }
    }))
  );

  const publicSchema = publicSchemaBuilder.buildSchema(config.schema);

  router.use(
    '/public/graphql',
    graphqlHTTP((req, res) => ({
      schema: publicSchema,
      graphiql: true,
      context: {}
    }))
  );

  // const filesRepository = new MongoRepository<FileModel>('files', db!);

  const fileRepository = mongoose.connection.models['file'];

  router.get('/files/:id', async (req, res) => {
    const { id } = req.params;
    const crop = req.query;
    const entity: FileModel = await fileRepository.findById(id);

    if (entity.fileRef) {
      const img = await jimp.read(entity.fileRef.path);

      if (crop.x && crop.y && crop.width && crop.height) {
        img.crop(parseInt(crop.x), parseInt(crop.y), parseInt(crop.width), parseInt(crop.height));
      }

      const imgBuffer = await img.getBufferAsync(entity.fileRef.mimetype);
      res.writeHead(200, { 'Content-Type': entity.fileRef.mimetype });
      res.end(imgBuffer, 'binary');
    } else {
      res.sendStatus(500);
    }
  });

  router.post('/files', upload.single('file'), (req, res) => {
    const { mimetype, path, filename, size } = req.file;
    res.send(req.file);
  });

  return [rootPath, router] as RequestHandlerParams[];
};

export default refractCmsHandler;
