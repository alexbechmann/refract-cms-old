type BasicPropertyType = StringConstructor | DateConstructor | NumberConstructor;

type ShapePropertyType = { [key: string]: PropertyType };

type PropertyType = BasicPropertyType | ShapePropertyType;

type Properties<T> = { [K in keyof T]: PropertyOptions<PropertyType> };

interface PropertyEditorProps<T> {
  setValue: (value: T | undefined) => void;
  propertyKey: string;
  value: T | undefined;
  propertyOptions: PropertyOptions<PropertyType>;
  serverUrl: string;
}

// type Properties<T extends {[K in keyof T]: PropertyType}> = { [K in keyof T]: PropertyOptions<T[K]> };

type ActualType<T extends PropertyType | any> = T extends BasicPropertyType
  ? T['prototype']
  : T extends ShapePropertyType
  ? { [K in keyof T]: ActualType<T[K]> }
  : never;

function composeFakeEditor<T>() {
  return (props: PropertyEditorProps<T>) => null;
}

export interface PropertyOptions<TPropertyType extends PropertyType | any> {
  displayName?: string;
  editorComponent: React.ComponentType<PropertyEditorProps<ActualType<TPropertyType>>>;
  defaultValue?: (() => ActualType<TPropertyType>) | ActualType<TPropertyType> | Promise<ActualType<TPropertyType>>;
  type: TPropertyType;
}

interface EntityOptions {}

type Resolver<TProperties, T> = (source: TProperties) => T | Promise<T>;

// type Return<TProperties extends Properties<T>, T> = { [K in keyof TProperties]: ActualType<TProperties[K]> };

// type EntitySchema<T = any, TAlias extends string = any> = {
//   alias: TAlias;
//   options: EntityOptions;
//   properties: { [K in keyof T]: PropertyOptions<T[K]> };
//   prototypes: ActualType<T>;
// };

type EntitySchema = ReturnType<typeof composeSchema>;

function composeSchema<T, TAlias extends string>(args: {
  alias: TAlias;
  properties: { [K in keyof T]: PropertyOptions<T[K]> };
  options: EntityOptions;
  // editors: { [K in keyof TProperties]: PropertyOptions<ActualType<TProperties[K]>> };
  // resolvers: { [K in keyof Partial<TProperties>]: Resolver<ActualType<TProperties>, ActualType<TProperties[K]>> };
}) {
  // EntitySchema<T, TAlias>
  type F = { [K in keyof T]: PropertyOptions<T[K]> };
  type Return = { [K in keyof F]: ActualType<F[K]['type']> };
  return {
    ...args,
    prototypes: {} as Return
  };
}

// function composeEditors<TProperties extends Properties<T>, T>(
//   schema: EntitySchema<TProperties, T>,
//   editors: { [K in keyof TProperties]: PropertyOptions<ActualType<TProperties[K]>> }
// ) {
//   return editors;
// }

const CommentSchema = composeSchema({
  alias: 'comment',
  options: {},
  properties: {
    text: {
      type: String,
      editorComponent: composeFakeEditor<string>(),
      defaultValue: 'hello',
      displayName: 'Text'
    },
    location: {
      editorComponent: composeFakeEditor<{ lat: number; lng: number }>(),
      displayName: 'Text',
      type: {
        lat: Number,
        lng: Number
      }
    }
  }
});

const ArticleSchema = composeSchema({
  alias: 'article',
  options: {},
  properties: {
    title: {
      type: String,
      editorComponent: composeFakeEditor<string>(),
      defaultValue: 'hello',
      displayName: 'Text'
    }
  }
  // editors: {
  //   title: {
  //     editorComponent: composeFakeEditor<string>()
  //   }
  // },
  // resolvers: {
  //   title: article => article.title + 'extra'
  // }
});

// composeEditors(CommentSchema, {
//   text: {
//     editorComponent: composeFakeEditor<string>(),
//     defaultValue: 'hello',
//     displayName: 'Text'
//   },
//   publishDate: {
//     editorComponent: composeFakeEditor<Date>(),
//     displayName: 'Text'
//   },
//   location: {
//     editorComponent: composeFakeEditor<{ lat: number; lng: number }>(),
//     displayName: 'Text'
//   }
// });

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
a.alias = 'd';

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
