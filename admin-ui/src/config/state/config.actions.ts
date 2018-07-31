import { createStandardAction, action } from 'typesafe-actions';
import { Config } from '../config';
import { getEntitiesWithMetadata } from '../../schema/get-entities-with-metadata';
import { EntityMetadata } from '../../schema/entity-metadata';

export const CONFIGURE = '@@CMS/init';

export const configure = (config: Config) => {
  return action(CONFIGURE, {
    ...config,
    entities: getEntitiesWithMetadata(config.entities)
  });
};
