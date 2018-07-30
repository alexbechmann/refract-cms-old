export const getSchemaMetadata = (allEntities: any[]) => {
  return allEntities.map(e => ({
    ...e,
    properties: Reflect.getMetadata('properties', e)
  }));
};
