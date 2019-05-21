type BasicPropertyType = StringConstructor | DateConstructor | NumberConstructor;

type ShapePropertyType = { [key: string]: PropertyType };

type PropertyType = BasicPropertyType | ShapePropertyType;

type Properties<T> = { [K in keyof T]: PropertyType };

type ActualType<TPropertyType extends PropertyType> = TPropertyType extends BasicPropertyType
  ? TPropertyType['prototype']
  : TPropertyType extends ShapePropertyType
  ? { [K in keyof TPropertyType]: ActualType<TPropertyType[K]> }
  : never;

function getPrototype<TPropertyType extends PropertyType>(property: TPropertyType) {
  if (typeof property === 'object') {
    const p: ShapePropertyType = property as any;
    return Object.keys(p).reduce((acc, propertyKey) => {
      acc[propertyKey] = getPrototype(p[propertyKey]);
      return acc;
    }, {});
  } else {
    return property.prototype;
  }
}

function createSchema<TProperties extends Properties<T>, T>(properties: TProperties) {
  type Return = { [K in keyof TProperties]: ActualType<TProperties[K]> };
  return {
    prototypes: getPrototype(properties) as Return
  };
}

const ArticleSchema = createSchema({
  name: String,
  createDate: Date,
  age: Number,
  location: {
    lat: Number,
    lng: Number
  }
});

const CommentSchema = createSchema({
  text: String
});

ArticleSchema.prototypes.createDate.toDateString();
ArticleSchema.prototypes.name.toLowerCase();
ArticleSchema.prototypes.location.lat.toFixed();

CommentSchema.prototypes.text.toUpperCase();
