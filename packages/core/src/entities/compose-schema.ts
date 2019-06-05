import { PropertyOptions, ResolvedPropertyOptions } from '../properties/property-options';
import { EntitySchema, Return } from './entity-schema';
import { EntityOptions } from './entity-options';

export function composeSchema<T>(args: {
  properties: { [K in keyof T]: PropertyOptions<T, T[K]> };
  options: EntityOptions<T>;
}): EntitySchema<T> {
  function createResolver<N>(properties: { [K in keyof N]: ResolvedPropertyOptions<T, N[K]> }) {
    return {
      [args.options.alias]: properties
    };
  }
  return {
    ...args,
    prototypes: {} as Return<T>,
    createResolver
  };
}
export default composeSchema;
