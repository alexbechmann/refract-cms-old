import { ConfigState } from '../config/state/config.state';
import { RouterState } from '../router/state/router.state';
import { EntityState } from '../entities/state/entity.state';

export interface AppState {
  config: ConfigState;
  router: RouterState;
  entity: EntityState;
}
