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

interface EntityOptions {}

type Return<TProperties extends Properties<T>, T> = { [K in keyof TProperties]: ActualType<TProperties[K]> };

type EntitySchema<TProperties extends Properties<T> = any, T = any, TAlias extends string = any> = {
  alias: TAlias;
  options: EntityOptions;
  properties: TProperties;
  prototypes: Return<TProperties, T>;
};

function createSchema<T, TProperties extends Properties<T>, TAlias extends string>(args: {
  alias: TAlias;
  properties: TProperties;
  options: EntityOptions;
  // editors: { [K in keyof TProperties]: PropertyOptions<ActualType<TProperties[K]>> };
}): EntitySchema<TProperties, T, TAlias> {
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
  alias: 'comment',
  options: {},
  properties: {
    text: String,
    publishDate: Date,
    location: {
      lat: Number,
      lng: Number
    }
  }
});

const ArticleSchema = createSchema({
  alias: 'article',
  options: {},
  properties: {
    title: String
  }
});

createEditors(CommentSchema, {
  text: {
    editorComponent: createFakeEditor<string>(),
    defaultValue: 'hello',
    displayName: 'Text'
  },
  publishDate: {
    editorComponent: createFakeEditor<Date>(),
    displayName: 'Text'
  },
  location: {
    editorComponent: createFakeEditor<{ lat: number; lng: number }>(),
    displayName: 'Text'
  }
});

interface Config<TEntitySchemas extends EntitySchema[] = []> {
  schemas: TEntitySchemas;
}

function configure<TEntitySchemas extends EntitySchema[]>(config: Config<TEntitySchemas>) {
  return config;
}
var s = {
  [CommentSchema.alias]: CommentSchema,
  [ArticleSchema.alias]: ArticleSchema
};

var [a, b] = [CommentSchema, ArticleSchema];
a.alias = 'd'

const config = configure({
  schemas: [CommentSchema, ArticleSchema]
});

// type AliasFromEntitySchema<TEntitySchema extends EntitySchema> = TEntitySchema['alias'];

// type D1<TProperties extends Properties<T>, T, E extends EntitySchema<TProperties>[]> = E extends (infer U)[]
//   ? E[U]
//   : never;

function configureClient<TEntitySchemas extends EntitySchema[]>(
  config: Config<TEntitySchemas>
  //clientConfig: { [K in keyof TEntitySchemas[number]['alias']]: any }
): { [K in keyof TEntitySchemas[number]['alias']]: TEntitySchemas[K] } {
  return {} as any;
}

ArticleSchema.alias;

var clientConfig = configureClient(config);

clientConfig[0].alias;

CommentSchema.prototypes.text.toUpperCase();
CommentSchema.prototypes.location.lat.toFixed();

function asSchemaType<T, TProperties extends Properties<T>>(schema: EntitySchema<TProperties, T>, obj: any) {
  return obj as ActualType<TProperties>;
}

type TypeFromSchema<TEntitySchema extends EntitySchema> = ActualType<TEntitySchema['properties']>;

var comment = asSchemaType(CommentSchema, {});

comment.text.toLocaleLowerCase();

var comment2: TypeFromSchema<typeof CommentSchema> = {} as any;
comment2.text;
comment.location.lat;
