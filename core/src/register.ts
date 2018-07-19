const entities: any[] = [];

export const getAllEntities = () => entities.map(e => e.alias);

export default function register(entity: any) {
  entities.push(entity);
}
