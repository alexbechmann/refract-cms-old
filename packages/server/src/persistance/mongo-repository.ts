import { Repository } from './repository.model';
import { EntitySchema, Entity } from '@refract-cms/core';
import { ServerConfig } from '../server-config.model';
import { MongoClient, Db, ObjectId } from 'mongodb';

export class MongoRepository<TEntity extends Entity = Entity> implements Repository<TEntity> {
  db: Db | null = null;

  constructor(private collectionName: string, serverConfig: ServerConfig) {
    MongoClient.connect(
      serverConfig.mongoConnectionString,
      {
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000
      },
      (err, mongoClient) => {
        console.log(err || 'Connected successfully to mongodb.');
        this.db = mongoClient.db('refract-cms');
      }
    );
  }

  collection() {
    return this.db!.collection(this.collectionName);
  }

  getById({ id }: { id: string }): Promise<TEntity> {
    return this.collection().findOne({ _id: new ObjectId(id) })!;
  }

  getAll({
    filter,
    skip,
    limit,
    orderBy
  }: {
    filter: any;
    skip: number;
    limit: number;
    orderBy: { field: string; direction: 'ASC' | 'DESC' };
  }): Promise<Entity[]> {
    let query = this.collection()
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

  insert(item: Partial<TEntity>): Promise<TEntity> {
    const now = new Date().toISOString();
    return this.collection()
      .insert({
        ...item,
        createDate: now,
        updateDate: now
      })
      .then(result => {
        console.log(item, result);
        return item as TEntity;
      });
  }

  update({ id, item }: { id: string; item: Partial<TEntity> }): Promise<TEntity> {
    return this.collection()
      .updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            ...item,
            updateDate: new Date().toISOString()
          }
        }
      )
      .then(result => {
        return ({
          _id: id,
          ...item
        } as any) as TEntity;
      });
  }

  delete({ id }: { id: string }): Promise<boolean> {
    return this.collection()
      .deleteOne({ _id: new ObjectId(id) })
      .then(r => {
        console.log(r);
        return true;
      });
  }
}
