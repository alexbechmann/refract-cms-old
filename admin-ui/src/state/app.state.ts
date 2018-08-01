import { ConfigState } from '../config/state/config.state';
import { RoutesState } from '../routes/state/routes.state';

export interface AppState {
  config: ConfigState;
  routes: RoutesState;
}
