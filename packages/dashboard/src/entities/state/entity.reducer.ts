import { AppAction } from '../../state/app-action';
import { EntityState } from './entity.state';
import { SET_ORDERBY, SET_ORDERBY_DIRECTION, ADD_FILTER, UPDATE_FILTER } from './entity.actions';
import { CONFIGURE } from '../../config/state/config.actions';

const defaultState: EntityState = {};

export function entityReducer(state = defaultState, action: AppAction): EntityState {
  switch (action.type) {
    case SET_ORDERBY: {
      return {
        ...state,
        [action.payload.alias]: {
          ...state[action.payload.alias],
          orderByDirection: state[action.payload.alias] ? state[action.payload.alias].orderByDirection || 'ASC' : 'ASC',
          orderByField: action.payload.orderByField
        }
      };
    }
    case ADD_FILTER: {
      return {
        ...state,
        [action.payload.alias]: {
          ...state[action.payload.alias],
          orderByDirection: state[action.payload.alias] ? state[action.payload.alias].orderByDirection || 'ASC' : 'ASC',
          filters: [...state[action.payload.alias].filters, action.payload.filter]
        }
      };
    }
    case UPDATE_FILTER: {
      const { schema } = action.payload;
      const newFilters = [...state[action.payload.alias].filters];
      if (action.payload.filter.propertyKey == state[action.payload.alias].filters[action.payload.index].propertyKey) {
        newFilters[action.payload.index] = action.payload.filter;
      } else {
        newFilters[action.payload.index] = {
          ...action.payload.filter,
          value: schema.properties[action.payload.filter.propertyKey].type()
        };
      }
      return {
        ...state,
        [action.payload.alias]: {
          ...state[action.payload.alias],
          filters: newFilters
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
          orderByField: schema.options.defaultSort ? schema.options.defaultSort.orderByField : undefined,
          filters: []
        };
        return acc;
      }, {});
    }

    default: {
      return state;
    }
  }
}
