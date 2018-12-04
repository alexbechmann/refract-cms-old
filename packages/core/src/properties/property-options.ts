import * as React from 'react';
import { PropertyEditorProps } from './property-editor-props';
import PropTypes from 'prop-types';
import { PropertyDescription, PropertyType } from './property-types';

export interface PropertyOptions<T = any> {
  displayName?: string;
  editorComponent?: React.ComponentType<PropertyEditorProps<T>>;
  defaultValue?: T;
  type: PropertyType<T>;
}
