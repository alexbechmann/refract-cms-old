const allEntities: any[] = [];

export const getAllEntities = () => {
  allEntities.forEach(e => {
    const properties = Reflect.getMetadata('properties', e);
  });
  return allEntities.map(e => e.alias);
};

export default function register(...entities: any[]) {
  entities.forEach(e => allEntities.push(e));
}
