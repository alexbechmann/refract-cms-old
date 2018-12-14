import mocha from 'mocha';
import chai from 'chai';
import { SchemaBuilder } from '../../../../packages/server/src/graphql/schema-builder';
import { RefractTypes, PropertyType } from '../../../../packages/core/src';
import { ProductSchema, Product } from '../../config/products/product.model'
import { printType, GraphQLString, GraphQLBoolean, GraphQLFloat } from 'graphql';
import refractConfig from '../../config/refract.config';

const expect = chai.expect;

mocha.describe('build shape', () => {
  const schemaBuilder = new SchemaBuilder(() => null as any);

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
  const schemaBuilder = new SchemaBuilder(() => null as any);
  mocha.it('should create valid string', () => {
    const type = schemaBuilder.buildType<string>("something", RefractTypes.string);
    expect(type).to.equal(GraphQLString);
  });

  mocha.it('should create valid boolean', () => {
    const schemaBuilder = new SchemaBuilder(() => null as any);
    const type = schemaBuilder.buildType<boolean>("something", RefractTypes.bool);
    expect(type).to.equal(GraphQLBoolean);
  });

  mocha.it('should create valid date', () => {
    const schemaBuilder = new SchemaBuilder(() => null as any);
    const type = schemaBuilder.buildType<Date>("something", RefractTypes.date);
    expect(type).to.equal(GraphQLString);
  });

  mocha.it('should create valid boolean', () => {
    const schemaBuilder = new SchemaBuilder(() => null as any);
    const type = schemaBuilder.buildType<number>("something", RefractTypes.number);
    expect(type).to.equal(GraphQLFloat);
  });
});

mocha.describe('build entity schema', () => {
  const schemaBuilder = new SchemaBuilder(() => null as any);
  mocha.it('should create valid entity', () => {
    const type = schemaBuilder.buildEntity<Product>(ProductSchema);
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
}`
    expect(printType(type)).to.equal(expected.trim());
  });

  mocha.describe('build entire schema', () => {
    mocha.it('should not crash', () => {
      const schema = schemaBuilder.buildSchema(refractConfig.schema)
      console.log(schema)
    })
  })
});
