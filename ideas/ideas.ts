type BasicPropertyType = StringConstructor | DateConstructor | NumberConstructor;

type ShapePropertyType = { [key: string]: PropertyType };

type PropertyType = BasicPropertyType | ShapePropertyType;

type Properties<T> = { [K in keyof T]: PropertyType };

// type Properties<T extends {[K in keyof T]: PropertyType}> = { [K in keyof T]: PropertyOptions<T[K]> };

type ActualType<T extends PropertyType> = T extends BasicPropertyType
  ? T['prototype']
  : T extends ShapePropertyType
  ? { [K in keyof T]: ActualType<T[K]> }
  : never;

export interface PropertyOptions<TPropertyType extends PropertyType> {
  displayName?: string;
  // editorComponent?: React.ComponentType<PropertyEditorProps<T>>;
  defaultValue?: ActualType<TPropertyType>;
  type: TPropertyType;
}

type Return<TProperties extends Properties<T>, T> = { [K in keyof TProperties]: ActualType<TProperties[K]> };

function createSchema<TProperties extends Properties<T>, T>(args: {
  properties: TProperties;
  options: any;
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
  }
});

const CommentSchema = createSchema({
  options: {},
  properties: {
    text: String
  }
});

ArticleSchema.prototypes.createDate.toDateString();
ArticleSchema.prototypes.name.toLowerCase();
ArticleSchema.prototypes.location.lat.toFixed();

CommentSchema.prototypes.text.toUpperCase();
