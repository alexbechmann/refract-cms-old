type BasicPropertyType = StringConstructor | DateConstructor | NumberConstructor | BooleanConstructor;

type ShapePropertyType = { [key: string]: PropertyType };

type PropertyType = BasicPropertyType | ShapePropertyType;

interface PropertyEditorProps<T> {
  setValue: (value: T | undefined) => void;
  propertyKey: string;
  value: T | undefined;
  propertyOptions: PropertyOptions<any, PropertyType>;
  serverUrl: string;
}

// type Properties<T extends {[K in keyof T]: PropertyType}> = { [K in keyof T]: PropertyOptions<T[K]> };

type ActualTypeFromPrototype<T> = T extends String
  ? string
  : T extends Date
  ? Date
  : T extends Number
  ? number
  : T extends Boolean
  ? boolean
  : never;

type ActualType<T extends PropertyType | any> = T extends BasicPropertyType
  ? ActualTypeFromPrototype<T['prototype']>
  : T extends ShapePropertyType
  ? { [K in keyof T]: ActualType<T[K]> }
  : T extends (infer U)[]
  ? U extends BasicPropertyType
    ? ActualTypeFromPrototype<U['prototype']>[]
    : never
  : never;

function composeFakeEditor<T>() {
  return (props: PropertyEditorProps<T>) => null;
}

// export interface EditablePropertyOptions<T, TPropertyType extends PropertyType | any> {
//
//   displayName?: string;
//   editorComponent?: React.ComponentType<PropertyEditorProps<ActualType<TPropertyType>>>;
//   defaultValue?: (() => ActualType<TPropertyType>) | ActualType<TPropertyType> | Promise<ActualType<TPropertyType>>;
//   type: TPropertyType;
// }

export interface ResolvedPropertyOptions<T, TPropertyType extends PropertyType | any> {
  type: TPropertyType;
  resolve?: Resolver<T, ActualType<TPropertyType>>;
}

export type PropertyOptions<T, TPropertyType extends PropertyType | any> = {
  displayName?: string;
  editorComponent?: React.ComponentType<PropertyEditorProps<ActualType<TPropertyType>>>;
  defaultValue?: (() => ActualType<TPropertyType>) | ActualType<TPropertyType> | Promise<ActualType<TPropertyType>>;
  type: TPropertyType;
};

interface EntityOptions {
  alias: string;
}

type Resolver<T, V> = (source: { [K in keyof T]: ActualType<T[K]> }) => V | Promise<V>;

// type Return<TProperties extends Properties<T>, T> = { [K in keyof TProperties]: ActualType<TProperties[K]> };

// type EntitySchema<T = any, TAlias extends string = any> = {
//   alias: TAlias;
//   options: EntityOptions;
//   properties: { [K in keyof T]: PropertyOptions<T[K]> };
//   prototypes: ActualType<T>;
// };

type EntitySchema<T = any> = {
  properties: { [K in keyof T]: PropertyOptions<T, T[K]> };
  options: EntityOptions;
  prototypes: Return<T>;
  createResolver: <N>(
    properties: { [K in keyof N]: ResolvedPropertyOptions<T, N[K]> }
  ) => { [key: string]: { [K in keyof N]: ResolvedPropertyOptions<T, N[K]> } };
};

type ObjectWithConstructorTypes<T> = { [K in keyof T]: PropertyOptions<T, T[K]> };
type Return<T> = { [K in keyof ObjectWithConstructorTypes<T>]: ActualType<ObjectWithConstructorTypes<T>[K]['type']> };

function composeSchema<T>(args: {
  properties: { [K in keyof T]: PropertyOptions<T, T[K]> };
  options: EntityOptions;
}): EntitySchema<T> {
  function createResolver<N>(properties: { [K in keyof N]: ResolvedPropertyOptions<T, N[K]> }) {
    return {
      [args.options.alias]: properties
    };
  }

  return {
    ...args,
    prototypes: {} as Return<T>,
    createResolver
  };
}

// function composeEditors<TProperties extends Properties<T>, T>(
//   schema: EntitySchema<TProperties, T>,
//   editors: { [K in keyof TProperties]: PropertyOptions<ActualType<TProperties[K]>> }
// ) {
//   return editors;
// }

const CommentSchema = composeSchema({
  options: { alias: 'comment' },
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
    },
    // upperCaseText: {
    //
    //   type: String,
    //   resolve: comment => comment.text.toUpperCase()
    // },
    tags: {
      type: [String]
    }
  }
});

const ArticleSchema = composeSchema({
  options: { alias: 'article' },
  properties: {
    title: {
      type: String,
      editorComponent: composeFakeEditor<string>(),
      defaultValue: 'hello',
      displayName: 'Text'
    }
  }
});

interface Config<TEntitySchemas extends EntitySchema[] = []> {
  schemas: TEntitySchemas;
}

function configure<TEntitySchemas extends EntitySchema[]>(config: Config<TEntitySchemas>) {
  return config;
}
const config = configure({
  schemas: [CommentSchema, ArticleSchema]
});

function configureServer(serverConfig: {
  config: Config<any>;
  resolvers: {
    [key: string]: {
      [key: string]: {
        type: PropertyType;
        resolve?: any;
      };
    };
  };
}) {
  return serverConfig;
}

configureServer({
  config,
  resolvers: {
    ...CommentSchema.createResolver({
      upperCaseText: {
        type: String,
        resolve: source => source.text.toUpperCase()
      },
      image: resolveImage()
    }),
    ...ArticleSchema.createResolver({
      upperCaseTitle: {
        type: String,
        resolve: source => source.title.toUpperCase()
      }
    })
  }
});

function resolveImage() {
  return {
    type: String
  };
}

CommentSchema.prototypes.text.toUpperCase();
CommentSchema.prototypes.location.lat.toFixed();
// CommentSchema.prototypes.upperCaseText.toLowerCase();
CommentSchema.prototypes.tags[0].toUpperCase();
