import { action } from 'typesafe-actions';
import { Config } from '../config';

export const CONFIGURE = '@@CMS/CONFIGURE';

export const configure = (config: Config) => {
  return action(CONFIGURE, config);
};
