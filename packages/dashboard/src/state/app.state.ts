import { ConfigState } from '../config/state/config.state';
import { RouterState } from '../router/state/router.state';
import { AuthState } from '../auth/state/auth.state';
import { NotificationState } from '../notifications/state/notification.state';

export interface AppState {
  config: ConfigState;
  router: RouterState;
  auth: AuthState;
  notification: NotificationState
}
