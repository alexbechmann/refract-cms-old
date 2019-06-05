import { PropertyOptions } from './property-options';
import { PropertyType } from './property-types';

export interface PropertyEditorProps<T> {
  setValue: (value: T | undefined) => void;
  propertyKey: string;
  value: T | undefined;
  propertyOptions: PropertyOptions<any, PropertyType>;
  serverUrl: string;
}
