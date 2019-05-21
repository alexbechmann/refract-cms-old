type BasicPropertyType = StringConstructor | DateConstructor | NumberConstructor;

type ShapePropertyType = { [key: string]: PropertyType };

type PropertyType = BasicPropertyType | ShapePropertyType;

type Properties<T> = { [K in keyof T]: PropertyType };

type ActualType<TPropertyType extends PropertyType> = TPropertyType extends BasicPropertyType
  ? TPropertyType['prototype']
  : TPropertyType extends ShapePropertyType
  ? { [K in keyof TPropertyType]: ActualType<TPropertyType[K]> }
  : never;

function createSchema<TProperties extends Properties<T>, T>(properties: TProperties) {
  type Return = { [K in keyof TProperties]: ActualType<TProperties[K]> };
  return {} as Return;
}

const Schema = createSchema({
  name: String,
  createDate: Date,
  age: Number,
  location: {
    lat: Number,
    lng: Number
  }
});

Schema.createDate.toDateString();
Schema.name.toLowerCase();
Schema.location.lat.toFixed();
