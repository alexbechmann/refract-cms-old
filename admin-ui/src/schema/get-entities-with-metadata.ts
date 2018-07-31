import { PropertyOptions } from './property-options';
import { EntityMetadata } from './entity-metadata';

export const getEntitiesWithMetadata = (classDefinitions: any[]) => {
  return classDefinitions.map(
    classDefinition =>
      ({
        options: classDefinition.options,
        properties: Reflect.getMetadata('properties', classDefinition) as PropertyOptions<any>
      } as EntityMetadata)
  );
};
