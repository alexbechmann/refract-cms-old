import { AppAction } from '../../state/app-action';
import { EntityState } from './entity.state';
import { SET_ORDERBY, SET_ORDERBY_DIRECTION } from './entity.actions';

const defaultState: EntityState = {};

export function entityReducer(state = defaultState, action: AppAction): EntityState {
  switch (action.type) {
    case SET_ORDERBY: {
      return {
        ...state,
        [action.payload.alias]: {
          orderByDirection: state[action.payload.alias] ? state[action.payload.alias].orderByDirection || 'ASC' : 'ASC',
          orderByField: action.payload.orderByField
        }
      };
    }
    case SET_ORDERBY_DIRECTION: {
      return {
        ...state,
        [action.payload.alias]: {
          ...state[action.payload.alias],
          orderByDirection: action.payload.direction
        }
      };
    }
    default: {
      return state;
    }
  }
}
