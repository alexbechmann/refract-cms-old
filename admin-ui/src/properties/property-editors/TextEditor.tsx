import * as React from 'react';
import { PropertyEditorProps } from '../property-editor-props';

export interface TextEditorOptions {
  maxLength?: number;
}

export default (options?: TextEditorOptions) => (props: PropertyEditorProps<string>) => {
  return <input maxLength={options.maxLength} value={props.value} onChange={e => props.setValue(e.target.value)} />;
};
