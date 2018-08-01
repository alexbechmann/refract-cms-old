import { combineReducers, Reducer } from 'redux';
import { AppState } from './app.state';
import { configReducer } from '../config/state/config.reducer';
import { routesReducer } from '../routes/state/routes.reducer';

export const rootReducer: Reducer<AppState> = combineReducers({
  config: configReducer,
  routes: routesReducer
});
