import defineEntity from '../entities/define-entity';
import { FileModel } from './file.model';
import { RefractTypes } from '../properties/property-types';
import createTextEditor from '../property-editors/TextEditor';
import ImageIcon from '@material-ui/icons/Image';
import createFileUploadEditor from '../property-editors/FileUploaderEditor';

export const FileSchema = defineEntity<FileModel>({
  options: {
    alias: 'file',
    displayName: 'File',
    icon: ImageIcon,
    instanceDisplayProps: file => ({
      primaryText: file._id,
      secondaryText: file.url,
      imageUrl: file.url
    })
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
    },
    fileName: {
      displayName: 'File',
      editorComponent: createFileUploadEditor({}),
      type: RefractTypes.string
    }
  }
});
