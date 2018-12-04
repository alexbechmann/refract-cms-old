import { createStore } from 'redux';
import { Store } from 'redux';
import { AppState } from './app.state';
import { rootReducer } from './root.reducer';

export const store: Store<AppState> = createStore(rootReducer);
