import { match } from 'react-router';
import { store } from '../state/root.store';

function buildPath<T>(relativePath: string) {
  const baseRoute = store.getState().routes.baseRoute;
  return `${baseRoute}${relativePath}`.replace('//', '/');
}

export const routes = {
  root: {
    path: <T>() => buildPath('/'),
    url: <T>() => buildPath('/')
  },
  entities: {
    path: <T>() => buildPath('/entities'),
    url: <T>() => buildPath('/entities')
  },
  entityRoot: {
    path: <T>(entityAlias: string) => buildPath(`/entities/${entityAlias}`),
    url: <T>(entityAlias: string) => buildPath(`/entities/${entityAlias}`)
  },
  entityEditById: {
    path: <T>(args: { entityAlias: string }) => buildPath(`/${args.entityAlias}/:id`),
    url: <T>(args: { id: string; entityAlias: string }) => buildPath(`/${args.entityAlias}/${args.id}`)
  }
};
