import { AppAction } from '../../state/app-action';
import { ConfigState } from './config.state';
import { CONFIGURE } from './config.actions';
import { getEntitiesWithMetadata } from '../../schema/get-entities-with-metadata';

const defaultState: ConfigState = {
  serverUrl: '',
  entities: []
};

export function configReducer(state: ConfigState = defaultState, action: AppAction) {
  switch (action.type) {
    case CONFIGURE: {
      return {
        ...state,
        ...action.payload
      };
    }
    default: {
      return state;
    }
  }
}
