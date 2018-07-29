export const getSchemaMetadata = (allEntities: any[]) => {
  return allEntities.map(e => ({
    alias: e.alias,
    properties: Reflect.getMetadata('properties', e)
  }));
};
