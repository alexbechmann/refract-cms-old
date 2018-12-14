import { EntitySchema, Entity } from "@refract-cms/core";

export interface Repository<TEntity extends Entity> {
  getById(args: {id: string}): Promise<TEntity>;
  getAll(args: {filter: any, skip: number, limit: number, orderBy: { field: string, direction: 'ASC' | 'DESC'}}): Promise<Entity[]>;
  insert(item: Partial<TEntity>): Promise<TEntity>
  update(args:  {id: string, item: Partial<TEntity>}): Promise<TEntity>
  delete(args: {id: string}): Promise<boolean>
}