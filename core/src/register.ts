const allEntities: any[] = [];

export const getAllEntities = () => {
  return allEntities.map(e => ({
    alias: e.alias,
    properties: Reflect.getMetadata('properties', e)
  }));
};

export default function register(...entities: any[]) {
  entities.forEach(e => allEntities.push(e));
}
