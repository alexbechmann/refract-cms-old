import { Store } from 'redux';
import { AppState } from './app.state';
import { rootReducer } from './root.reducer';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';

export const history = createBrowserHistory();

export const store: Store<AppState> = createStore(
  connectRouter(history)(rootReducer),
  undefined,
  compose(applyMiddleware(routerMiddleware(history)))
);
