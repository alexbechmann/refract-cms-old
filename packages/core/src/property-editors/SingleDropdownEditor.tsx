import * as React from 'react';
import { PropertyEditorProps } from '../properties/property-editor-props';
import { TextField, Select, MenuItem, ListItemText } from '@material-ui/core';

export interface SingleDropdownEditorOptions {
  selectOptions: string[];
}

export default (options?: SingleDropdownEditorOptions) => (props: PropertyEditorProps<string>) => {
  const selectOptions = options.selectOptions || [];
  return (
    <Select value={props.value || selectOptions[0]} fullWidth onChange={e => props.setValue(e.target.value)}>
      {selectOptions.map(selectOption => (
        <MenuItem key={selectOption} value={selectOption}>
          <ListItemText primary={selectOption} />
        </MenuItem>
      ))}
    </Select>
  );
};
