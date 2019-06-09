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

function createSchema<TProperties extends Properties<T>, T>(args: {
  properties: TProperties;
  options: any;
  editors: { [K in keyof T]: PropertyOptions<ActualType<TProperties[K]>> };
}) {
  return {
    ...args,
    prototypes: {} as Return<TProperties, T>
  };
}

const ArticleSchema = createSchema({
  options: {},
  properties: {
    name: String,
    createDate: Date,
    age: Number,
    location: {
      lat: Number,
      lng: Number
    }
  },
  editors: {
    name: {
      editorComponent: createFakeEditor<string>(),
      defaultValue: '',
      displayName: ''
    },
    createDate: {
      editorComponent: createFakeEditor<Date>(),
      defaultValue: () => new Date(),
      displayName: ''
    },
    age: {
      editorComponent: createFakeEditor<number>(),
      defaultValue: 4,
      displayName: ''
    },
    location: {
      editorComponent: createFakeEditor<{ lat: number; lng: number }>(),
      defaultValue: {
        lat: 3,
        lng: 4
      },
      displayName: ''
    }
  }
});

const CommentSchema = createSchema({
  options: {},
  properties: {
    text: String
  },
  editors: {
    text: {
      editorComponent: createFakeEditor<string>()
    }
  }
});

ArticleSchema.prototypes.createDate.toDateString();
ArticleSchema.prototypes.name.toLowerCase();
ArticleSchema.prototypes.location.lat.toFixed();

CommentSchema.prototypes.text.toUpperCase();
