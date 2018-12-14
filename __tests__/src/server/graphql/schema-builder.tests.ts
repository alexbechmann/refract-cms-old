import mocha from 'mocha';
import chai from 'chai';
import { schemaBuilder } from '../../../../packages/server/src/graphql/schema-builder';
import { RefractTypes, PropertyType } from '../../../../packages/core/src';
import {ProductSchema, Product} from '../../config/products/product.model'
import { printType, GraphQLString, GraphQLBoolean, GraphQLFloat } from 'graphql';

const expect = chai.expect;

mocha.describe('build shape', () => {
  mocha.it('should create valid shape (Location)', () => {
    const shape = schemaBuilder.buildShape("Location", RefractTypes.shape({
      lat: RefractTypes.number,
      lng: RefractTypes.number,
      deep: RefractTypes.shape({
        level: RefractTypes.number
      })
    }));

      const expected = `
type Location {
  lat: Float
  lng: Float
  deep: Locationdeep
}
      `

    expect(printType(shape).trim()).to.equal(expected.trim());
    expect(printType(shape).trim()).to.equal(expected.trim());
  });
});

mocha.describe('build types', () => {
  mocha.it('should create valid string', () => {
    const type = schemaBuilder.buildType<string>("something", RefractTypes.string);
    expect(type).to.equal(GraphQLString);
  });

  mocha.it('should create valid boolean', () => {
    const type = schemaBuilder.buildType<boolean>("something", RefractTypes.bool);
    expect(type).to.equal(GraphQLBoolean);
  });

  mocha.it('should create valid date', () => {
    const type = schemaBuilder.buildType<Date>("something", RefractTypes.date);
    expect(type).to.equal(GraphQLString);
  });

  mocha.it('should create valid boolean', () => {
    const type = schemaBuilder.buildType<number>("something", RefractTypes.number);
    expect(type).to.equal(GraphQLFloat);
  });
});

mocha.describe('build entity schema', () => {
  mocha.it('should create valid entity', () => {
    const type = schemaBuilder.buildEntity<Product>(ProductSchema);
    const expected = `
type product {
  productType: String
  customNumber: Float
  location: productlocation
  title: String
  category: String
  types: [String]
  locations: [productlocations]
}`
    expect(printType(type)).to.equal(expected.trim());
  });
});