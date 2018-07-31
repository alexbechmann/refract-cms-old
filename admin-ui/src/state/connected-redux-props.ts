import { Dispatch } from "redux";
import { AppState } from './app.state';

export interface ConnectedReduxProps {
  dispatch: Dispatch<AppState>;
}
