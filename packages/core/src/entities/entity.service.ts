import { store } from '../state/root.store';
import axios from 'axios';
import { Entity } from '../entities/entity.model';
import { Omit } from '@material-ui/core';

export class EntityService<TEntity extends Entity> {
  entityAlias: string;
  constructor(args: { alias: string }) {
    this.entityAlias = args.alias;
  }
  insert(entity: TEntity): Promise<TEntity> {
    return axios
      .post(`${store.getState().config.serverUrl}/entities/${this.entityAlias}`, entity)
      .then(response => response.data);
  }

  update(id: string, entity: Omit<{ [P in keyof TEntity]: TEntity[P] }, '_id'>): Promise<TEntity> {
    const { entityAlias } = this;
    return axios
      .put(`${store.getState().config.serverUrl}/entities/${this.entityAlias}/${id}`, entity)
      .then(response => response.data);
  }

  delete(id: string): Promise<TEntity> {
    return axios
      .delete(`${store.getState().config.serverUrl}/entities/${this.entityAlias}/${id}`)
      .then(response => response.data);
  }

  getAll(): Promise<TEntity[]> {
    return axios
      .get(`${store.getState().config.serverUrl}/entities/${this.entityAlias}`)
      .then(response => response.data);
  }

  getById(id: string): Promise<TEntity> {
    return axios
      .get(`${store.getState().config.serverUrl}/entities/${this.entityAlias}/${id}`)
      .then(response => response.data);
  }
}
