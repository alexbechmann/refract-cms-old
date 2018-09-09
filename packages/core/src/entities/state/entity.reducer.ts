import { EntityState } from './entity.state';
import { AppAction } from '../../state/app-action';
import { GETTING_ENTITIES_FOR_ALIAS, GET_ENTITIES_FOR_ALIAS } from './entity.actions';

const defaultState: EntityState = {
  entities: {},
  loading: {}
};

export function entityReducer(state = defaultState, action: AppAction): EntityState {
  switch (action.type) {
    case GETTING_ENTITIES_FOR_ALIAS: {
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload]: true
        }
      };
    }
    case GET_ENTITIES_FOR_ALIAS: {
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.meta.alias]: false
        },
        entities: {
          ...state.entities,
          [action.meta.alias]: action.payload
        }
      };
    }
    default: {
      return state;
    }
  }
}
