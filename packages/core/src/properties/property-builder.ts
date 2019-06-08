import { EntitySchema } from '../entities/entity-schema';
import { PropertyOptions } from './property-options';
import { createSingleEntityPickerEditor, createMultipleEntityPickerEditor } from '..';

function singleReference(
  schema: EntitySchema,
  options?: Pick<PropertyOptions<any, String>, 'displayName' | 'defaultValue'>
): PropertyOptions<any, StringConstructor> {
  return {
    ...options,
    type: String,
    editorComponent: createSingleEntityPickerEditor({
      schema
    }),
    resolverPlugin: {
      alias: 'singleReference',
      meta: { schema }
    }
  };
}

function multipleReferences(
  schema: EntitySchema,
  options?: Pick<PropertyOptions<any, String>, 'displayName' | 'defaultValue'>
): PropertyOptions<any, StringConstructor[]> {
  return {
    ...options,
    type: [String],
    editorComponent: createMultipleEntityPickerEditor({
      schema
    }),
    resolverPlugin: {
      alias: 'multipleReferences',
      meta: { schema }
    }
  };
}

export const propertyBuilder = {
  singleReference,
  multipleReferences
};
