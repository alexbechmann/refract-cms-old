type BasicPropertyType = StringConstructor | DateConstructor | NumberConstructor;

type ShapePropertyType = { [key: string]: PropertyType };

type PropertyType = BasicPropertyType | ShapePropertyType;

type Properties<T> = { [K in keyof T]: PropertyOptions<T[K]> };

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

export interface PropertyOptions<TPropertyType extends PropertyType> {
  displayName?: string;
  editorComponent?: React.ComponentType<PropertyEditorProps<ActualType<TPropertyType>>>;
  defaultValue?: (() => ActualType<TPropertyType>) | ActualType<TPropertyType> | Promise<ActualType<TPropertyType>>;
  type: TPropertyType;
}

function createSchema<TProperties extends Properties<T>, T>(args: {
  properties: TProperties;
  options: any;
  // editors: { [K in keyof T]: PropertyOptions<ActualType<TProperties[K]>> };
}) {
  type Return = { [K in keyof TProperties]: ActualType<TProperties[K]['type']> };

  return {
    ...args,
    prototypes: {} as Return
  };
}

// const ArticleSchema = createSchema({
//   options: {},
//   properties: {
//     name: String,
//     createDate: Date,
//     age: Number,
//     location: {
//       lat: Number,
//       lng: Number
//     }
//   },
//   editors: {
//     name: {
//       editorComponent: createFakeEditor<string>(),
//       defaultValue: '',
//       displayName: ''
//     },
//     createDate: {
//       editorComponent: createFakeEditor<Date>(),
//       defaultValue: () => new Date(),
//       displayName: ''
//     },
//     age: {
//       editorComponent: createFakeEditor<number>(),
//       defaultValue: 4,
//       displayName: ''
//     },
//     location: {
//       editorComponent: createFakeEditor<{ lat: number; lng: number }>(),
//       defaultValue: {
//         lat: 3,
//         lng: 4
//       },
//       displayName: ''
//     }
//   }
// });

const CommentSchema = createSchema({
  options: {},
  properties: {
    text: {
      editorComponent: createFakeEditor<string>(),
      type: String
    },
    location: {
      editorComponent: createFakeEditor<{ lat: number; lng: Date }>(),
      defaultValue: {
        lat: 3,
        lng: 4
      },
      displayName: '',
      type: {
        lat: String,
        lng: Number
      }
    }
  }
});

// ArticleSchema.prototypes.createDate.toDateString();
// ArticleSchema.prototypes.name.toLowerCase();
// ArticleSchema.prototypes.location.lat.toFixed();

CommentSchema.prototypes.text.toUpperCase();
CommentSchema.prototypes.location.lat.toFixed();
