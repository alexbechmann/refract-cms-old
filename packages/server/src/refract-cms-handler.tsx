import * as express from 'express';
import graphqlHTTP from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { Dashboard } from '@refract-cms/dashboard';
import { Config, graphqlQueryHelper, File, Crop } from '@refract-cms/core';
import { merge } from 'lodash';
import { printType } from 'graphql';
import { MongoClient, Db, ObjectId } from 'mongodb';
import { ServerConfig } from './server-config.model';
import { RequestHandlerParams } from 'express-serve-static-core';
import multer from 'multer';
import jimp from 'jimp';
import { buildTypes } from './graphql/build-types';
import { authService } from './auth/auth.service';
import uniqueString from 'unique-string';
import fs from 'fs';

let db: Db;

const refractCmsHandler = ({
  rootPath,
  config,
  serverConfig
}: {
  rootPath: string;
  config: Config;
  serverConfig: ServerConfig;
}) => {
  MongoClient.connect(
    serverConfig.mongoConnectionString,
    {
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000
    },
    (err, mongoClient) => {
      console.log(err || 'Connected successfully to mongodb.');
      db = mongoClient.db('refract-cms');
    }
  );

  const router = express.Router();
  const storage = multer.diskStorage({
    destination: serverConfig.filesPath,
    filename(req, file, cb) {
      console.log(file);
      cb(null, `${uniqueString()}_${file.originalname}`);
    }
  });
  const upload = multer({ storage });
  const baseTypes = `
    type Query {
      getFiles: [File]
    }
    type Mutation {
      generateAccessToken(username: String!, password: String!): String!
      fileDelete(id: String!): Boolean
    }
    type File {
      _id: String!
      url: String!
      mimetype: String
    }
    type User {
      _id: String!
      displayName: String
      email: String
      username: String
     }
     enum OrderByDirection {
       ASC
       DESC
     }
  `;

  const baseResolvers = {
    Query: {
      getFiles: (_, {}, context) => {
        return db
          .collection('files')
          .find({})
          .toArray();
      }
    },
    File: {
      _id: file => `${file._id}`,
      url: (file: File, a, b, c) => {
        return `${rootPath}/files/${file._id}`;
      }
    },
    Mutation: {
      generateAccessToken: async (_, { username, password }, context) => {
        const userId = await authService.findUserIdWithCredentials(username, password, serverConfig);
        if (userId) {
          return authService.createAccessToken(userId, serverConfig);
        } else {
          return null;
        }
      }
    }
  };

  const entityGraphQLTypes = config.schema.map(schema => {
    const types = buildTypes(schema);
    const schemaName = graphqlQueryHelper.schemaName(schema.options.alias);
    let maxOneQuery = '';
    let maxOneResolver = {};

    if (schema.options.maxOne) {
      maxOneQuery = `${schema.options.alias}Get: ${schemaName}`;
      maxOneResolver = {
        Query: {
          [`${schema.options.alias}Get`]: async (obj: any, {  }: {}, context: any) => {
            const items = await db
              .collection(schema.options.alias)
              .find({})
              .toArray();
            console.log(items);
            return items.length > 0
              ? items[0]
              : Object.keys(schema.properties).reduce((acc, propertyKey) => {
                  acc[propertyKey] = schema.properties[propertyKey].defaultValue;
                  return acc;
                }, {});
          }
        }
      };
    }

    const queryType = `
      extend type Query {
        ${
          schema.options.alias
        }GetAll(filter: Input${schemaName}, skip: Int, limit: Int, orderBy: OrderBy${schemaName}): [${schemaName}]
        ${schema.options.alias}GetById(id: String!): ${schemaName}
        ${maxOneQuery}
      }
      extend type Mutation {
        ${schema.options.alias}Create(item: Input${schemaName}): ${schemaName}
        ${schema.options.alias}Update(id: String!, item: Input${schemaName}): ${schemaName}
        ${schema.options.alias}Delete(id: String!): Boolean
      }
    `;
    return {
      schema: [queryType, ...types.map(type => printType(type))].join(`
      `),
      resolvers: merge(
        {
          Query: {
            [`${schema.options.alias}GetById`]: (obj: any, { id }: { id: string }, context: any) => {
              return db.collection(schema.options.alias).findOne({ _id: new ObjectId(id) });
            },
            [`${schema.options.alias}GetAll`]: (
              obj: any,
              { filter = {}, skip = 0, limit = 999, orderBy }: any,
              context: any
            ) => {
              console.log(filter, skip, limit, orderBy);
              let query = db
                .collection(schema.options.alias)
                .find(filter)
                .skip(skip)
                .limit(limit);

              if (orderBy) {
                query = query.sort(
                  orderBy.field.replace('_', '.'),
                  orderBy.direction ? (orderBy.direction === 'ASC' ? 1 : -1) : 1
                );
              }

              return query.toArray();
            }
          },
          Mutation: {
            [`${schema.options.alias}Create`]: (_, { item }, context) => {
              console.log(item);
              return db
                .collection(schema.options.alias)
                .insert(item)
                .then(result => {
                  console.log(item, result);
                  return item;
                });
            },
            [`${schema.options.alias}Update`]: (_, { id, item }, context) => {
              return db
                .collection(schema.options.alias)
                .updateOne(
                  { _id: new ObjectId(id) },
                  {
                    $set: item
                  }
                )
                .then(result => {
                  console.log(item, result);
                  return {
                    _id: id,
                    item
                  };
                });
            },
            [`${schema.options.alias}Delete`]: (_, { id }, context) => {
              console.log('deleting' + id);
              return db
                .collection(schema.options.alias)
                .deleteOne({ _id: new ObjectId(id) })
                .then(r => {
                  console.log(r);
                  return true;
                });
            },
            [`fileDelete`]: async (_, { id }, context) => {
              const file = await db.collection('files').findOne({ _id: new ObjectId(id) });
              console.log('deleting' + id);
              fs.unlinkSync(file.path);
              console.log(id, file);
              await db.collection('files').deleteOne({ _id: new ObjectId(id) });
              // fs.unlinkSync(file.path);
              return true;
            }
          },
          [schemaName]: {
            _id: item => `${item._id}`
          }
        },
        maxOneResolver
      )
    };
  });

  const typeDefs = [baseTypes, ...entityGraphQLTypes.map(t => t.schema)];
  const resolvers = merge(baseResolvers, ...entityGraphQLTypes.map(t => t.resolvers));

  const graphqlSchema = makeExecutableSchema({
    typeDefs,
    resolvers
  });

  router.use(
    '/graphql',
    graphqlHTTP((req, res) => ({
      schema: graphqlSchema,
      graphiql: true,
      context: {
        userId: req.headers.authorization
          ? authService.verifyAccessToken(req.headers.authorization!, serverConfig).nameid
          : null
      }
    }))
  );

  router.get('/files/:id', async (req, res) => {
    const { id } = req.params;
    const crop = req.query;
    const entity = await db.collection('files').findOne({ _id: new ObjectId(id) });
    const img = await jimp.read(entity.path);

    if (crop.x && crop.y && crop.width && crop.height) {
      img.crop(parseInt(crop.x), parseInt(crop.y), parseInt(crop.width), parseInt(crop.height));
    }

    const imgBuffer = await img.getBufferAsync(entity.mimetype);
    res.writeHead(200, { 'Content-Type': entity.mimetype });
    res.end(imgBuffer, 'binary');
  });

  router.post('/files', upload.single('file'), (req, res) => {
    const { mimetype, path, filename, size } = req.file;
    db.collection('files')
      .insert({
        mimetype,
        path,
        filename,
        size
      })
      .then(() => {
        res.send(200);
      });
  });

  return [rootPath, router] as RequestHandlerParams[];
};

export default refractCmsHandler;
