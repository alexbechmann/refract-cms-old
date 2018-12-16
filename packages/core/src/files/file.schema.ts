import defineEntity from '../entities/define-entity';
import { File } from './file.model';
import { RefractTypes } from '../properties/property-types';

export const FileSchema = defineEntity<File>({
  options: {
    alias: 'files2',
    displayName: 'Files'
  },
  properties: {
    mimetype: {
      type: RefractTypes.string
    },
    url: {
      type: RefractTypes.string
    },
    path: {
      type: RefractTypes.string
    }
  }
});
