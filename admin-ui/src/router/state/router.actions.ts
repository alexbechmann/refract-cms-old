import { createStandardAction, action } from 'typesafe-actions';

export const SET_BASE_ROUTE = '@@CMS/SET_BASE_ROUTE';

export const setBaseRoute = (baseRoute: string) => {
  const buildPath = <T>(relativePath: string) => `${baseRoute}${relativePath}`.replace('//', '/');
  const routes = {
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
      path: <T>(args: { entityAlias: string }) => buildPath(`/entities/${args.entityAlias}/save/:id?`),
      url: <T>(args: { id: string | undefined; entityAlias: string }) =>
        buildPath(`/entities/${args.entityAlias}/save${args.id ? '/' + args.id : ''}`)
    }
  };
  return action(SET_BASE_ROUTE, routes);
};
