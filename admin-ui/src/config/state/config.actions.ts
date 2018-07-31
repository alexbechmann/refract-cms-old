import { createStandardAction, action } from 'typesafe-actions';
import { Config } from '../config';
import { getEntitiesWithMetadata } from '../../entities/get-entities-with-metadata';
import { EntityMetadata } from '../../entities/entity-metadata';

export const CONFIGURE = '@@CMS/init';

export const configure = (config: Config) => {
  return action(CONFIGURE, {
    ...config,
    entities: getEntitiesWithMetadata(config.entities)
  });
};
