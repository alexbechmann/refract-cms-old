import { createStandardAction, action } from 'typesafe-actions';

export const SET_BASE_ROUTE = '@@CMS/SET_BASE_ROUTE';

export const setBaseRoute = (baseRoute: string) => {
  const buildPath = <T>(relativePath: string) => `${baseRoute}${relativePath}`.replace('//', '/');
  const routes = {
    root: {
      path: <T>() => buildPath('/'),
      url: <T>() => buildPath('/')
    },
    content: {
      path: <T>() => buildPath('/content'),
      url: <T>() => buildPath('/content')
    },
    entityRoot: {
      path: <T>(entityAlias: string) => buildPath(`/content/${entityAlias}`),
      url: <T>(entityAlias: string) => buildPath(`/content/${entityAlias}`)
    },
    entityEditById: {
      path: <T>(args: { entityAlias: string }) => buildPath(`/content/${args.entityAlias}/save/:id?`),
      url: <T>(args: { id: string | undefined; entityAlias: string }) =>
        buildPath(`/content/${args.entityAlias}/save${args.id ? '/' + args.id : ''}`)
    }
  };
  return action(SET_BASE_ROUTE, routes);
};
