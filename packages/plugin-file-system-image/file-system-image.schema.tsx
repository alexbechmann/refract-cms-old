import { composeSchema, createTextEditor, PropertyEditorProps } from '@refract-cms/core';
import { FileModel } from './file.model';
import ImageIcon from '@material-ui/icons/Image';
import { FileRef } from './file-ref.model';
import createFileUploadEditor from './FileUploaderEditor';
import { FileService } from './file.service';

export const FileSystemImageSchema = composeSchema({
  options: {
    alias: 'file',
    displayName: 'Image',
    icon: ImageIcon,
    instanceDisplayProps: (file, { context }) => {
      const fileService = new FileService(context.serverUrl);
      return {
        primaryText: file._id,
        secondaryText: file.fileRef ? file.fileRef.path : undefined,
        imageUrl: fileService.buildImageUrl({
          fileId: file._id,
          pixelCrop: {
            height: 100,
            width: 100,
            x: undefined,
            y: undefined
          }
        })
      };
    }
  },
  properties: {
    fileRef: {
      editorComponent: createFileUploadEditor({}),
      displayName: 'Image',
      type: {
        fileName: String,
        path: String,
        mimetype: String,
        size: Number
      },
      resolverPlugin: {
        alias: 'fileSystemImage',
        meta: ''
      }
    }
  }
});
