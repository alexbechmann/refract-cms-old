import React, { Component, Fragment } from 'react';
import { PropertyEditorProps } from '../properties/property-editor-props';
import FileUploader from '../files/FileUploader';

interface Props extends FileUploaderEditorOptions, PropertyEditorProps<string> {}

interface FileUploaderEditorOptions {}

export default (options: FileUploaderEditorOptions) =>
  class FileUploaderEditor extends Component<Props> {
    render() {
      return (
        <Fragment>
          <FileUploader
            onUploaded={file => {
              this.props.setValue(file._id);
            }}
          />
        </Fragment>
      );
    }
  } as React.ComponentType<PropertyEditorProps<string>>;
