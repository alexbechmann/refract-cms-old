import composeSchema from '../entities/compose-schema';
import { FileModel } from './file.model';
import createTextEditor from '../property-editors/TextEditor';
import ImageIcon from '@material-ui/icons/Image';
import createFileUploadEditor from '../property-editors/FileUploaderEditor';
import { PropertyEditorProps } from '../properties/property-editor-props';
import { FileRef } from './file-ref.model';

export const FileSystemImageSchema = composeSchema({
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
      mode: 'edit',
      editorComponent: createFileUploadEditor({}),
      displayName: 'Image',
      type: {
        fileName: String,
        path: String,
        mimetype: String,
        size: Number
      }
    },
    fileUrl: {
      mode: 'resolve',
      type: String,
      resolve: image => image.fileRef.path.toUpperCase() + 'test url'
    }
  }
});
