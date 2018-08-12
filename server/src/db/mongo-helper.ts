import MongoClient, { Db } from 'mongodb';
import { createQuery } from 'odata-v4-mongodb';

var mongoDb: Db;

export const mongoHelper = {
  db: () => {
    return new Promise<Db>(async (resolve, reject) => {
      if (mongoDb) {
        resolve(mongoDb);
      } else {
        const db: Db = await mongoHelper.init();
        resolve(db);
      }
    });
  },
  init() {
    return new Promise<Db>((resolve, reject) => {
      MongoClient.connect(
        'mongodb://root:hqXzNv2f5YC45veW@localhost:27017/umbraco?authSource=admin',
        {
          reconnectTries: Number.MAX_VALUE,
          reconnectInterval: 1000
        },
        (err, mongoClient) => {
          console.log(err || 'Connected successfully to mongodb.');
          mongoDb = mongoClient.db('firestore-cms');
          if (!err) {
            resolve(mongoDb);
          } else {
            reject(err);
          }
        }
      );
    });
  },
  createMongoQueryFromOdataUrl: (url: string) => {
    if (url.indexOf('$') > -1) {
      var i = url.indexOf('$');
      var queryString = `$${url.substr(i + 1)}`;
      const query = createQuery(queryString);
      if (!query.limit) {
        query.limit = 10;
      }
      if (!query.skip) {
        query.skip = 0;
      }
      return query;
    } else {
      return {
        query: {},
        limit: 10,
        skip: 0
      };
    }
  }
};
