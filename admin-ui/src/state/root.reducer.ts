import { combineReducers, Reducer } from 'redux';
import { AppState } from './app.state';
import { configReducer } from '../config/state/config.reducer';

export const rootReducer: Reducer<AppState> = combineReducers({
  config: configReducer
});
