import { action } from 'typesafe-actions';

export const SET_ORDERBY = '@@CMS/ENTITIES/SET_ORDERBY';

export const setOrderByField = (args: { alias: string; orderByField: string }) => {
  return action(SET_ORDERBY, args);
};
