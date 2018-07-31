export interface PropertyEditorProps<T> {
  setValue: (value: T) => void;
  propertyKey: string;
  value: T;
}