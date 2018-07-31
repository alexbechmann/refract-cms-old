import { PropertyOptions } from './property-options';
import { EntityMetadata } from './entity-metadata';

export const getSchemaMetadata = (allEntities: any[]) => {
  return allEntities.map(
    e =>
      ({
        ...e,
        properties: Reflect.getMetadata('properties', e) as PropertyOptions<any>
      } as EntityMetadata)
  );
};
