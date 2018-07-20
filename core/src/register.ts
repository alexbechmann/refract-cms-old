const entities: any[] = [];

export const getAllEntities = () => {
  entities.forEach(e => {
    const properties = Reflect.getMetadata('properties', e);
    console.log(properties);
  });
  return entities.map(e => e.alias);
};

export default function register(entity: any) {
  entities.push(entity);
}
