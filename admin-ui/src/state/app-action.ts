import { ActionType } from 'typesafe-actions';
import * as ConfigActions from '../config/state/config.actions';

export type AppAction = ActionType<typeof ConfigActions>;
