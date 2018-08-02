import { PropertyOptions } from '../properties/property-options';
import { EntitySchema } from './entity-schema';
import { EntityOptions } from './entity-options';

const defineEntity = <T>(options: EntityOptions) => (properties: { [P in keyof T]: PropertyOptions<T[P]> }) => {
  const entityMetadata: EntitySchema = {
    options,
    properties
  };
  return entityMetadata;
};

export default defineEntity;
