import { createStore, applyMiddleware } from 'redux';
import { Store } from 'redux';
import { AppState } from './app.state';
import { rootReducer } from './root.reducer';
//const ReduxPromise = require('redux-promise');

export const store: Store<AppState> = createStore(rootReducer); // applyMiddleware(ReduxPromise)
