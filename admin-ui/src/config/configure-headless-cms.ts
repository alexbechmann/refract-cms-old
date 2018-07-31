import { store } from '../state/root.store';
import { configure } from './state/config.actions';
import { Config } from './config';

export const configureHeadlessCms = (config: Config) => {
  store.dispatch(configure(config));
};
