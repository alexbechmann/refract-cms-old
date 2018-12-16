import defineEntity from '../entities/define-entity';
import { File } from './file.model';
import { RefractTypes } from '../properties/property-types';
import createTextEditor from '../property-editors/TextEditor';

export const FileSchema = defineEntity<File>({
  options: {
    alias: 'file',
    displayName: 'File'
  },
  properties: {
    mimetype: {
      displayName: 'Type',
      editorComponent: createTextEditor(),
      type: RefractTypes.string
    },
    url: {
      displayName: 'Url',
      editorComponent: createTextEditor(),
      type: RefractTypes.string
    }
  }
});
