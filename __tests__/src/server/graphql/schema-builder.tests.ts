import mocha from 'mocha';
import chai from 'chai';
import { SchemaBuilder } from '../../../../packages/server/src/graphql/schema.builder';
import { PropertyType, composeSchema, Config, configure, propertyBuilder } from '../../../../packages/core/src';
import { ProductSchema } from '../../config/products/product.schema';
import { printType, GraphQLString, GraphQLBoolean, GraphQLFloat } from 'graphql';
import refractConfig from '../../config/refract.config';
import { ServerConfig } from 'packages/server/src/server-config.model';
import { GraphQLDateTime } from 'graphql-iso-date';

const expect = chai.expect;
let schemaBuilder: SchemaBuilder;

mocha.describe('build shape', () => {
  mocha.beforeEach(() => {
    schemaBuilder = new SchemaBuilder();
    schemaBuilder.init({ resolverPlugins: [] } as ServerConfig);
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

  mocha.it('should not crash', () => {
    const schema = schemaBuilder.buildSchema(refractConfig.schema);
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
        author: propertyBuilder.singleReference(AuthorSchema)
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
}`.trim()
    );
  });
});

mocha.describe('build entire schema', () => {});
