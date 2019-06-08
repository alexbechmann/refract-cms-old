import mocha from 'mocha';
import chai from 'chai';
import { PublicSchemaBuilder } from '../../../../packages/server/src/graphql/public-schema.builder';
import { PropertyType } from '../../../../packages/core/src';
import { ProductSchema, Product } from '../../config/products/product.model';
import { printType, GraphQLString, GraphQLBoolean, GraphQLFloat } from 'graphql';
import refractConfig from '../../config/refract.config';
import { ServerConfig } from 'packages/server/src/server-config.model';
import { GraphQLDateTime } from 'graphql-iso-date';

const expect = chai.expect;

const publicSchemaBuilder = new PublicSchemaBuilder({} as ServerConfig);

mocha.describe('build shape', () => {
  mocha.it('should create valid shape (Location)', () => {
    const shape = publicSchemaBuilder.buildShape('Location', {
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
    const type = publicSchemaBuilder.buildType<string>('something', String);
    expect(type).to.equal(GraphQLString);
  });

  mocha.it('should create valid boolean', () => {
    const type = publicSchemaBuilder.buildType<boolean>('something', Boolean);
    expect(type).to.equal(GraphQLBoolean);
  });

  mocha.it('should create valid date', () => {
    const type = publicSchemaBuilder.buildType<Date>('something', Date);
    expect(type).to.equal(GraphQLDateTime);
  });

  mocha.it('should create valid boolean', () => {
    const type = publicSchemaBuilder.buildType<number>('something', Number);
    expect(type).to.equal(GraphQLFloat);
  });
});

mocha.describe('build entity schema', () => {
  mocha.it('should create valid entity', () => {
    const type = publicSchemaBuilder.buildEntity<Product>('product', ProductSchema.properties);
    const expected = `
type product {
  _id: MongoId
  productType: String
  customNumber: Float
  location: productlocation
  title: String
  category: String
  types: [String]
  locations: [productlocations]
}`;
    expect(printType(type)).to.equal(expected.trim());
  });

  mocha.it('should not crash', () => {
    const schema = publicSchemaBuilder.buildSchema(refractConfig.schema);
  });
});

mocha.describe('build entire schema', () => {});
