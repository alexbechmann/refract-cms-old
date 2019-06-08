import { ResolverPlugin } from './resolver-plugin.model';
import { EntitySchema } from '@refract-cms/core';
import { repositoryForSchema } from '../repository-for-schema';
import { createResolverPlugin } from './create-resolver-plugin';
import { PublicSchemaBuilder } from '../graphql/public-schema.builder';

export const refPlugin = createResolverPlugin({
  alias: 'singleReference',
  buildFieldConfig: ({ propertyKey, meta, serverConfig, schemaBuilder }) => {
    const refSchema: EntitySchema = meta.schema;
    return {
      type: schemaBuilder.buildEntityFromSchema({
        entitySchema: refSchema,
        prefixName: '',
        addResolvers: true
      }),
      resolve: source => {
        const id: string = source[propertyKey] as any;
        return repositoryForSchema(refSchema).findOne({ _id: id }) as any;
      }
    };
  }
});
