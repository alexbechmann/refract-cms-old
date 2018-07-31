import { createStandardAction } from 'typesafe-actions';
import { Config } from '../config';

export const CONFIGURE = '@@CMS/init';

export const configure = createStandardAction(CONFIGURE)<Config>();
