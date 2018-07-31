import * as React from 'react';
import { PropertyEditorProps } from './property-editor-props';

export interface PropertyOptions<T = any> {
  displayName?: string;
  editorComponent?: React.ComponentType<PropertyEditorProps<T>>;
}