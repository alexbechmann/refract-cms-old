import { combineReducers, Reducer } from 'redux';
import { AppState } from './app.state';
import { configReducer } from '../config/state/config.reducer';
import { routesReducer } from '../router/state/router.reducer';

export const rootReducer: Reducer<AppState> = combineReducers({
  config: configReducer,
  router: routesReducer
});