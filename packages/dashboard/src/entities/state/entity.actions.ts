import { action } from 'typesafe-actions';

export const SET_ORDERBY = '@@CMS/ENTITIES/SET_ORDERBY';
export const SET_ORDERBY_DIRECTION = '@@CMS/ENTITIES/SET_ORDERBY_DIRECTION';

export const setOrderByField = (args: { alias: string; orderByField: string }) => {
  return action(SET_ORDERBY, args);
};

export const setOrderByDirection = (args: { alias: string; direction: 'ASC' | 'DESC' }) => {
  return action(SET_ORDERBY_DIRECTION, args);
};
