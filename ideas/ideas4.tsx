type BasicPropertyType = StringConstructor | DateConstructor | NumberConstructor;

type ShapePropertyType = { [key: string]: PropertyType };

type PropertyType = BasicPropertyType | ShapePropertyType;

type Properties<T> = { [K in keyof T]: PropertyType };

interface PropertyEditorProps<T> {
  setValue: (value: T | undefined) => void;
  propertyKey: string;
  value: T | undefined;
  propertyOptions: PropertyOptions<T>;
  serverUrl: string;
}

// type Properties<T extends {[K in keyof T]: PropertyType}> = { [K in keyof T]: PropertyOptions<T[K]> };

type ActualType<T extends PropertyType> = T extends BasicPropertyType
  ? T['prototype']
  : T extends ShapePropertyType
  ? { [K in keyof T]: ActualType<T[K]> }
  : never;

function createFakeEditor<T>() {
  return (props: PropertyEditorProps<T>) => null;
}

export interface PropertyOptions<T> {
  displayName?: string;
  editorComponent?: React.ComponentType<PropertyEditorProps<T>>;
  defaultValue?: (() => T) | T | Promise<T>;
  // type: TPropertyType;
}

type Return<TProperties extends Properties<T>, T> = { [K in keyof TProperties]: ActualType<TProperties[K]> };

type EntitySchema<TProperties extends Properties<T>, T> = {
  options: any;
  properties: TProperties;
  prototypes: Return<TProperties, T>;
};

function createSchema<TProperties extends Properties<T>, T>(args: {
  properties: TProperties;
  options: any;
}): EntitySchema<TProperties, T> {
  return {
    ...args,
    prototypes: {} as Return<TProperties, T>
  };
}

function createEditors<TProperties extends Properties<T>, T>(
  schema: EntitySchema<TProperties, T>,
  editors: { [K in keyof TProperties]: PropertyOptions<ActualType<TProperties[K]>> }
) {
  return editors;
}

const CommentSchema = createSchema({
  options: {},
  properties: {
    text: String
  }
});

createEditors(CommentSchema, {
  text: {
    editorComponent: createFakeEditor<string>(),
    defaultValue: 'hello',
    displayName: 'Text'
  }
});

CommentSchema.prototypes.text.toUpperCase();
