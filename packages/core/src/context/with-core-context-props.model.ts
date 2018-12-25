import { FileService } from '../files/file.service';
import { CoreContextModel } from './core-context.model';

export interface WithCoreContextProps {
  context: CoreContextModel;
}
