import { PropertyOptions } from "./property-options";

export interface PropertyEditorProps<T> {
  setValue: (value: T) => void;
  propertyKey: string;
  value: T;
  propertyOptions: PropertyOptions;
}