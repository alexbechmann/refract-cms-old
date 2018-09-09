import { ActionType } from 'typesafe-actions';
import * as ConfigActions from '../config/state/config.actions';
import * as RouterActions from '../router/state/router.actions';
import * as EntityActions from '../entities/state/entity.actions';

export type AppAction = ActionType<typeof ConfigActions | typeof RouterActions | typeof EntityActions>;
