import { action, createStandardAction } from 'typesafe-actions';
import { EntityService } from '../entity.service';
import { Dispatch } from 'redux';
import { promisePayload } from '../../state/promise-payload';
import { Entity } from '../entity.model';

export const GET_ENTITIES_FOR_ALIAS = '@@CMS/GET_ENTITIES_FOR_ALIAS';
export const GETTING_ENTITIES_FOR_ALIAS = '@@CMS/GETTING_ENTITIES_FOR_ALIAS';

export const gettingEntitiesForAlias = (alias: string) => action(GETTING_ENTITIES_FOR_ALIAS, alias);

export const receivedEntitiesForAlias = <TEntity extends Entity>(entities: TEntity[], alias: string) =>
  action(GET_ENTITIES_FOR_ALIAS, entities, {
    alias
  });

export const getEntitiesForAlias = (alias: string, dispatch: Dispatch<any>) => {
  new EntityService({ alias }).getAll().then(entities => {
    dispatch(receivedEntitiesForAlias(entities, alias));
  });

  return gettingEntitiesForAlias(alias);
};
