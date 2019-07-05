import * as React from 'react';
import { PropertyEditorProps } from '../properties/property-editor-props';
import { Checkbox } from '@material-ui/core';

export interface BooleanEditorOptions {
  checked?: boolean;
}

const defaultOptions: BooleanEditorOptions = { checked: false };

export default (options: BooleanEditorOptions = defaultOptions) => (props: PropertyEditorProps<boolean>) => {
  return (
    <Checkbox
      checked={props.value || options.checked}
      onChange={e => {
        return props.setValue(e.target.checked);
      }}
    />
  );
};
