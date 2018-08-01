import { RoutesState } from './routes.state';
import { AppAction } from '../../state/app-action';
import { SET_BASE_ROUTE } from './routes.actions';

const defaultState: RoutesState = {
  baseRoute: '',
  baseRouteSetup: false
};

export function routesReducer(state: RoutesState = defaultState, action: AppAction): RoutesState {
  switch (action.type) {
    case SET_BASE_ROUTE: {
      return {
        baseRoute: action.payload,
        baseRouteSetup: true
      };
    }
    default: {
      return state;
    }
  }
}
