import { EditablePropertyOptions } from './property-options';
import { PropertyType } from './property-types';

export interface PropertyEditorProps<T> {
  setValue: (value: T | undefined) => void;
  propertyKey: string;
  value: T | undefined;
  propertyOptions: EditablePropertyOptions<any, PropertyType>;
  serverUrl: string;
}
