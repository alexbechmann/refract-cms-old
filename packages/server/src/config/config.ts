import { GraphQLString, GraphQLScalarType, GraphQLNonNull, GraphQLNullableType } from 'graphql';
import { Omit } from 'react-redux';
import { EntitySchema } from '../entities/entity.schema';

export interface Config {
  mongoConnectionString?: string;
  schema: EntitySchema[];
}

export const configure = (config: Config) => {
  global['refract-cms-config'] = config;
};

export const getCurrentConfig = () => global['refract-cms-config'] as Config;
