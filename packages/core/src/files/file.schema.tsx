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
    instanceDisplayProps: (file, { context }) => ({
      primaryText: file.fileRef ? file.fileRef.fileName : undefined,
      secondaryText: file.fileRef ? file.fileRef.path : undefined,
      imageUrl: context.fileService.buildImageUrl(file._id)
    })
  },
  properties: {
    fileRef: {
      displayName: 'File',
      editorComponent: createFileUploadEditor({}),
      type: RefractTypes.shape({
        fileName: RefractTypes.string,
        path: RefractTypes.string,
        mimetype: RefractTypes.string,
        size: RefractTypes.number
      })
    }
  }
});
