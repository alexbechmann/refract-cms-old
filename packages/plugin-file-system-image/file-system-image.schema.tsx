import { composeSchema, createTextEditor, PropertyEditorProps } from '@refract-cms/core';
import { FileModel } from './file.model';
import ImageIcon from '@material-ui/icons/Image';
import { FileRef } from './file-ref.model';

export const FileSystemImageSchema = composeSchema({
  options: {
    alias: 'file',
    displayName: 'File',
    icon: ImageIcon
    // instanceDisplayProps: (file, { context }) => ({
    //   primaryText: file.fileRef ? file.fileRef.fileName : undefined,
    //   secondaryText: file.fileRef ? file.fileRef.path : undefined,
    //   imageUrl: context.fileService.buildImageUrl(file._id)
    // })
  },
  properties: {
    // fileRef: {
    //   editorComponent: createFileUploadEditor({}),
    //   displayName: 'Image',
    //   type: {
    //     fileName: String,
    //     path: String,
    //     mimetype: String,
    //     size: Number
    //   }
    // }
  }
});
