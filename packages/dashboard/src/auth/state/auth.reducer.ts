import { AnyAction } from 'redux';
import { AuthState } from './auth.state';
import { SET_ACTIVE_USER_TOKEN } from './auth.actions';

export function authReducer(state: AuthState = {}, action: AnyAction): AuthState {
  switch (action.type) {
    case SET_ACTIVE_USER_TOKEN: {
      console.log(action);
      return {
        ...state,
        activeUserToken: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
