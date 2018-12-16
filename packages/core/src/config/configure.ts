import { Config } from './config';
import { FileSchema } from '../files/file.schema';
import { EntitySchema } from '../entities/entity-schema';

export default (config: Config) => {
  config.schema.push(FileSchema as EntitySchema<any>);
  return config;
};
