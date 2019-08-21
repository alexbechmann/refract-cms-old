import mocha from 'mocha';
import chai from 'chai';
import { SchemaBuilder } from '../../../../packages/server/src/graphql/schema.builder';
import {
  PropertyType,
  composeSchema,
  Config,
  configure,
  propertyBuilder,
  createTextEditor,
  createLocationEditor,
  createSingleDropdownEditor,
  createMultipleDropdownEditor
} from '../../../../packages/core/src';
import { printType, GraphQLString, GraphQLBoolean, GraphQLFloat } from 'graphql';
import { GraphQLDateTime } from 'graphql-iso-date';
import { ServerOptions } from 'packages/server/src/config/server-options.model';

const expect = chai.expect;
let schemaBuilder: SchemaBuilder;

mocha.describe('build shape', () => {
  mocha.beforeEach(() => {
    schemaBuilder = new SchemaBuilder();
    schemaBuilder.init({ resolverPlugins: [], events: [] } as ServerOptions);
  });

  mocha.it('should create valid shape (Location)', () => {
    const shape = schemaBuilder.buildShape('Location', {
      lat: Number,
      lng: Number,
      deep: {
        level: Number
      }
    });

    const expected = `
type Location {
  lat: Float
  lng: Float
  deep: Locationdeep
}
      `;

    expect(printType(shape).trim()).to.equal(expected.trim());
    expect(printType(shape).trim()).to.equal(expected.trim());
  });
});

mocha.describe('build types', () => {
  mocha.it('should create valid string', () => {
    const type = schemaBuilder.buildType<string>('something', String);
    expect(type).to.equal(GraphQLString);
  });

  mocha.it('should create valid boolean', () => {
    const type = schemaBuilder.buildType<boolean>('something', Boolean);
    expect(type).to.equal(GraphQLBoolean);
  });

  mocha.it('should create valid date', () => {
    const type = schemaBuilder.buildType<Date>('something', Date);
    expect(type).to.equal(GraphQLDateTime);
  });

  mocha.it('should create valid boolean', () => {
    const type = schemaBuilder.buildType<number>('something', Number);
    expect(type).to.equal(GraphQLFloat);
  });
});

mocha.describe('build entity schema', () => {
  mocha.it('should create valid entity', () => {
    const ProductSchema = composeSchema({
      options: {
        alias: 'product',
        displayName: 'Product',
        instanceDisplayProps: product => ({
          primaryText: `${product.title}`,
          secondaryText: product.productType
        })
      },
      properties: {
        title: {
          displayName: 'Title',
          editorComponent: createTextEditor({
            maxLength: 30
          }),
          defaultValue: '',
          type: String
        },
        productType: {
          displayName: 'Product type',
          editorComponent: createTextEditor({ maxLength: 10 }),
          defaultValue: 'default',
          type: String
        },
        customNumber: {
          displayName: 'Custom number',
          defaultValue: 3,
          type: Number
        },
        location: {
          displayName: 'Location',
          editorComponent: createLocationEditor(),
          defaultValue: {
            lng: 15,
            lat: 23
          },
          type: {
            lat: Number,
            lng: Number
          }
        },
        category: {
          displayName: 'Category',
          editorComponent: createSingleDropdownEditor({
            selectOptions: ['Electronics', 'Food']
          }),
          type: String
        },
        types: {
          displayName: 'Types',
          editorComponent: createMultipleDropdownEditor({
            selectOptions: ['Type1', 'Type2']
          }),
          type: [String]
        }
      }
    });
    const type = schemaBuilder.buildEntity('product', ProductSchema.properties);
    const expected = `
type product {
  _id: MongoId
  title: String
  productType: String
  customNumber: Float
  location: productlocation
  category: String
  types: [String]
}`;
    expect(printType(type)).to.equal(expected.trim());
  });

  mocha.it('should correctly create reference schema', () => {
    const AuthorSchema = composeSchema({
      options: {
        alias: 'author'
      },
      properties: {
        name: {
          type: String
        }
      }
    });
    const ArticleSchema = composeSchema({
      options: {
        alias: 'article'
      },
      properties: {
        title: {
          type: String
        },
        author: propertyBuilder.singleReference(AuthorSchema),
        tags: {
          type: [String]
        },
        locations: {
          type: [
            {
              lat: Number,
              lng: Number
            }
          ]
        },
        primary: {
          type: Boolean
        }
      }
    });

    const config: Config = configure({
      schema: [ArticleSchema, AuthorSchema]
    });

    const { publicGraphQLSchema } = schemaBuilder.buildSchema(config.schema);

    expect(printType(publicGraphQLSchema.getType('article'))).to.equal(
      `
type article {
  _id: MongoId
  title: String
  author: author
  tags: [String]
  locations: [articlelocations]
  primary: Boolean
}`.trim()
    );

    expect(printType(publicGraphQLSchema.getType('articlelocations'))).to.equal(
      `
type articlelocations {
  lat: Float
  lng: Float
}`.trim()
    );
  });
});
