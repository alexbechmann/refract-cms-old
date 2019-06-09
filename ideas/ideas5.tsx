import { any } from 'async';

type BasicPropertyType = StringConstructor | DateConstructor | NumberConstructor;

type ShapePropertyType = { [key: string]: PropertyType };

type PropertyType = BasicPropertyType | ShapePropertyType;

type F<T> = {};

type Properties<T> = { [K in keyof T]: PropertyOptions<T[K]> };

interface PropertyEditorProps<T> {
  setValue: (value: T | undefined) => void;
  propertyKey: string;
  value: T | undefined;
  // propertyOptions: PropertyOptions<T>;
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

// function composeEditableField<TPropertyType extends PropertyType>(type: TPropertyType) {
//   return (propertyOptions: PropertyOptions<TPropertyType>) => propertyOptions;
// }

// function composeResolvedField() {}

// composeEditableField(String)({
//   editorComponent: createFakeEditor<string>(),
//   defaultValue: 'hello',
//   displayName: 'Text'
// });

export interface PropertyOptions<TPropertyType extends PropertyType, T = ActualType<TPropertyType>> {
  displayName?: string;
  editorComponent?: React.ComponentType<PropertyEditorProps<T>>;
  defaultValue?: (() => T) | T | Promise<T>;
  type?: TPropertyType;
  resolve?: (() => T) | T | Promise<T>;
}

interface EntityOptions {}

//type Return<TProperties extends Properties<T>, T> = { [K in keyof TProperties]: TProperties[K]['defaultValue'] };

type EntitySchema<TProperties extends Properties<T> = any, T = any, TAlias extends string = any> = {
  alias: TAlias;
  options: EntityOptions;
  properties: TProperties;
  //prototypes: Return<TProperties, T>;
};

function composeSchema<TProperties extends Properties<T>, T, TAlias extends string>(args: {
  alias: TAlias;
  properties: TProperties;
  options: EntityOptions;
  // editors: { [K in keyof TProperties]: PropertyOptions<ActualType<TProperties[K]>> };
}) {
  type Ret = { [K in keyof TProperties]: TProperties[K] };
  return {
    ...args,
    // prototypes: {} as Return<TProperties, T>,
    p: ({} as any) as Ret
  };
}

// function createEditors<TProperties extends Properties<T>, T>(
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
      editorComponent: createFakeEditor<Date>(),
      defaultValue: 'hello',
      displayName: 'Text',
      type: Number
    }
  }
});

// const ArticleSchema = composeSchema({
//   alias: 'article',
//   options: {},
//   properties: {
//     title: composeEditableField(String)({
//       editorComponent: createFakeEditor<string>(),
//       defaultValue: 'hello',
//       displayName: 'Text'
//     }),
//     date: composeEditableField(Date)({
//       editorComponent: createFakeEditor<Date>(),
//       defaultValue: () => new Date(),
//       displayName: 'Date'
//     })
//   }
// });

// createEditors(CommentSchema, {
//   text: {
//     editorComponent: createFakeEditor<string>(),
//     defaultValue: 'hello',
//     displayName: 'Text'
//   }
// });

interface Config<TEntitySchemas extends EntitySchema[] = any> {
  schemas: TEntitySchemas;
}

function configure<TEntitySchemas extends EntitySchema[]>(config: Config<TEntitySchemas>) {
  return config;
}

const config = configure({
  schemas: [CommentSchema]
});

// type AliasFromEntitySchema<TEntitySchema extends EntitySchema> = TEntitySchema['alias'];

// function configureClient<TEntitySchemas extends EntitySchema[]>(
//   config: Config<TEntitySchemas>,
//   clientConfig: { [K in keyof TEntitySchemas]: TEntitySchemas[0]['alias'] }
// ) {
//   return {} as TEntitySchemas;
// }

// ArticleSchema.alias;

// configureClient(config, {
//   article: {},
//   comment: {}
// });

var f: ActualType<StringConstructor> = {} as any;

f.toString();

CommentSchema.p.text.toUpperCase();

// ArticleSchema.prototypes.date.getDay();
