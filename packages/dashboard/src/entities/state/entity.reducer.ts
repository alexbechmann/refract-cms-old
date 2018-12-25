import { AppAction } from '../../state/app-action';
import { EntityState } from './entity.state';
import { SET_ORDERBY } from './entity.actions';

const defaultState: EntityState = {};

export function entityReducer(state = defaultState, action: AppAction): EntityState {
  switch (action.type) {
    case SET_ORDERBY: {
      return {
        ...state,
        [action.payload.alias]: {
          orderByField: action.payload.orderByField
        }
      };
    }
    default: {
      return state;
    }
  }
}
