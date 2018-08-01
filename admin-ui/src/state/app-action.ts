import { ActionType } from 'typesafe-actions';
import * as ConfigActions from '../config/state/config.actions';
import * as RoutesActions from '../routes/state/routes.actions';

export type AppAction = ActionType<typeof ConfigActions | typeof RoutesActions>;
