import { ConfigState } from '../config/state/config.state';
import { RouterState } from '../router/state/router.state';

export interface AppState {
  config: ConfigState;
  router: RouterState;
}
