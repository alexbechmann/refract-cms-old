import React, { Component, Fragment } from 'react';
import { PropertyEditorProps } from '@refract-cms/core';
import FileUploader from './FileUploader';
import { Typography } from '@material-ui/core';
import { FileRef } from './file-ref.model';

interface Props extends FileUploaderEditorOptions, PropertyEditorProps<FileRef> {}

interface FileUploaderEditorOptions {}

export default (options: FileUploaderEditorOptions) =>
  class FileUploaderEditor extends Component<Props> {
    render() {
      const { value } = this.props;
      return (
        <Fragment>
          {value && <Typography>{value.path}</Typography>}
          <FileUploader
            onUploaded={file => {
              this.props.setValue(file);
            }}
          />
        </Fragment>
      );
    }
  } as React.ComponentType<PropertyEditorProps<FileRef>>;
