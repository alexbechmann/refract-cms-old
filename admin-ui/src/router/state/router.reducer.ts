import { RouterState } from './router.state';
import { AppAction } from '../../state/app-action';
import { SET_BASE_ROUTE } from './router.actions';

const defaultState: RouterState = {
  routes: undefined
};

export function routesReducer(state: RouterState = defaultState, action: AppAction): RouterState {
  switch (action.type) {
    case SET_BASE_ROUTE: {
      const baseRoute = action.payload;
      const buildPath = <T>(relativePath: string) => `${baseRoute}${relativePath}`.replace('//', '/');
      return {
        routes: {
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
        }
      };
    }
    default: {
      return state;
    }
  }
}
