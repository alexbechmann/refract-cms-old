import mocha from 'mocha';
import chai from 'chai';
import { publicSchemaBuilder } from '../../../../packages/server/src/graphql/public-schema.builder';
import { RefractTypes, PropertyType } from '../../../../packages/core/src';
import { ProductSchema, Product } from '../../config/products/product.model';
import { printType, GraphQLString, GraphQLBoolean, GraphQLFloat } from 'graphql';
import refractConfig from '../../config/refract.config';
import { ServerConfig } from 'packages/server/src/server-config.model';

const expect = chai.expect;

mocha.describe('build shape', () => {
  mocha.it('should create valid shape (Location)', () => {
    const shape = publicSchemaBuilder.buildShape(
      'Location',
      RefractTypes.shape({
        lat: RefractTypes.number,
        lng: RefractTypes.number,
        deep: RefractTypes.shape({
          level: RefractTypes.number
        })
      })
    );

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
    const type = publicSchemaBuilder.buildType<string>('something', RefractTypes.string);
    expect(type).to.equal(GraphQLString);
  });

  mocha.it('should create valid boolean', () => {
    const type = publicSchemaBuilder.buildType<boolean>('something', RefractTypes.bool);
    expect(type).to.equal(GraphQLBoolean);
  });

  mocha.it('should create valid date', () => {
    const type = publicSchemaBuilder.buildType<Date>('something', RefractTypes.date);
    expect(type).to.equal(GraphQLString);
  });

  mocha.it('should create valid boolean', () => {
    const type = publicSchemaBuilder.buildType<number>('something', RefractTypes.number);
    expect(type).to.equal(GraphQLFloat);
  });
});

mocha.describe('build entity schema', () => {
  mocha.it('should create valid entity', () => {
    const type = publicSchemaBuilder.buildEntity<Product>('product', ProductSchema.properties);
    const expected = `
type product {
  _id: String
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
    const schema = publicSchemaBuilder.buildSchema(refractConfig.schema, { publicGraphql: [] } as ServerConfig);
  });
});

mocha.describe('build entire schema', () => {});
