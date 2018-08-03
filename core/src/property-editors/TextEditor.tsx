import * as React from 'react';
import { PropertyEditorProps } from '../properties/property-editor-props';
import { TextField } from '@material-ui/core';

export interface TextEditorOptions {
  maxLength?: number;
}

export default (options?: TextEditorOptions) => (props: PropertyEditorProps<string>) => {
  return (
    <TextField
      inputProps={{
        maxLength: options.maxLength
      }}
      label={props.propertyOptions.displayName}
      value={props.value || ''}
      onChange={e => props.setValue(e.target.value)}
    />
  );
};
