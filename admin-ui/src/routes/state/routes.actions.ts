import { createStandardAction } from 'typesafe-actions';

export const SET_BASE_ROUTE = '@@CMS/SET_BASE_ROUTE';

export const setBaseRoute = createStandardAction(SET_BASE_ROUTE)<string>();
