import { Config } from './config';
import { FileSchema } from '../files/file.schema';

export default (config: Config) => {
  config.schema.push(FileSchema as EntitySchema<any>);
  return config;
};
