import { AppAction } from '../../state/app-action';
import { EntityState } from './entity.state';
import { SET_ORDERBY, SET_ORDERBY_DIRECTION } from './entity.actions';
import { CONFIGURE } from '../../config/state/config.actions';

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
    case CONFIGURE: {
      return action.payload.schema.reduce((acc, schema) => {
        acc[schema.options.alias] = {
          orderByDirection: schema.options.defaultSort ? schema.options.defaultSort.orderByDirection || 'ASC' : 'ASC',
          orderByField: schema.options.defaultSort ? schema.options.defaultSort.orderByField : undefined
        };
        return acc;
      }, {});
    }
    default: {
      return state;
    }
  }
}
