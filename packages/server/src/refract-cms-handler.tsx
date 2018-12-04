import * as express from 'express';
import graphqlHTTP from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { Dashboard } from '@refract-cms/dashboard';
import { Config, graphqlQueryHelper, File } from '@refract-cms/core';
import { merge } from 'lodash';
import {
  printType,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInputObjectType
} from 'graphql';
import { MongoClient, Db, ObjectId } from 'mongodb';
import { ServerConfig } from './server-config.model';
import { RequestHandlerParams } from 'express-serve-static-core';
import multer from 'multer';
import jimp from 'jimp';
import { buildTypes } from './graphql/build-types';

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
      cb(null, `${file.originalname}`);
    }
  });
  const upload = multer({ storage });
  const baseTypes = `
    type Query {
      getFiles: [File]
    }
    type Mutation {
      do: Boolean
    }
    type File {
      _id: String!
      url: String!
      mimetype: String
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
    }
  };

  const entityGraphQLTypes = config.schema.map(schema => {
    const types = buildTypes(schema);
    const schemaName = graphqlQueryHelper.schemaName(schema.options.alias);
    const queryType = `
      extend type Query {
        ${schema.options.alias}GetAll: [${schemaName}]
        ${schema.options.alias}GetById(id: String!): ${schemaName}
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
      resolvers: {
        Query: {
          [`${schema.options.alias}GetById`]: (obj: any, { id }: { id: string }, context: any) => {
            return db.collection(schema.options.alias).findOne({ _id: new ObjectId(id) });
          },
          [`${schema.options.alias}GetAll`]: (obj: any, {  }: any, context: any) => {
            return db
              .collection(schema.options.alias)
              .find({})
              .toArray();
          }
        },
        Mutation: {
          do: (_, args, context) => {
            return Promise.resolve(true);
          },
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
          }
        },
        [schemaName]: {
          _id: item => `${item._id}`
        }
      }
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
    graphqlHTTP({
      schema: graphqlSchema,
      graphiql: true
    })
  );

  router.get('/files/:id', async (req, res) => {
    const { id } = req.params;
    const entity = await db.collection('files').findOne({ _id: new ObjectId(id) });
    const img = await jimp.read(entity.path);
    // img.cover(720, 480);
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
