import { RouterState } from './router.state';
import { AppAction } from '../../state/app-action';
import { SET_BASE_ROUTE } from './router.actions';

function buildPath<T>(baseRoute: string, relativePath: string) {
  return `${baseRoute}${relativePath}`.replace('//', '/');
}

const defaultState: RouterState = {
  routes: undefined
};

export function routesReducer(state: RouterState = defaultState, action: AppAction): RouterState {
  switch (action.type) {
    case SET_BASE_ROUTE: {
      const baseRoute = action.payload;
      return {
        routes: {
          root: {
            path: <T>() => buildPath(baseRoute, '/'),
            url: <T>() => buildPath(baseRoute, '/')
          },
          entities: {
            path: <T>() => buildPath(baseRoute, '/entities'),
            url: <T>() => buildPath(baseRoute, '/entities')
          },
          entityRoot: {
            path: <T>(entityAlias: string) => buildPath(baseRoute, `/entities/${entityAlias}`),
            url: <T>(entityAlias: string) => buildPath(baseRoute, `/entities/${entityAlias}`)
          },
          entityEditById: {
            path: <T>(args: { entityAlias: string }) => buildPath(baseRoute, `/${args.entityAlias}/:id`),
            url: <T>(args: { id: string; entityAlias: string }) =>
              buildPath(baseRoute, `/${args.entityAlias}/${args.id}`)
          }
        }
      };
    }
    default: {
      return state;
    }
  }
}
