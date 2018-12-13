import mocha from 'mocha';
import chai from 'chai';
import { schemaBuilder } from '../../../../packages/server/src/graphql/schema-builder';
import { RefractTypes, PropertyType } from '../../../../packages/core/src';
import {ProductSchema} from '../../config/products/product.model'
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

    expect(printType(shape.type).trim()).to.equal(expected.trim());
    expect(printType(shape.type).trim()).to.equal(expected.trim());
  });
});

mocha.describe('build types', () => {
  mocha.it('should create valid string', () => {
    const value = schemaBuilder.buildType<string>("something", RefractTypes.string);
    expect(value.type).to.equal(GraphQLString);
  });

  mocha.it('should create valid boolean', () => {
    const value = schemaBuilder.buildType<boolean>("something", RefractTypes.bool);
    expect(value.type).to.equal(GraphQLBoolean);
  });

  mocha.it('should create valid date', () => {
    const value = schemaBuilder.buildType<Date>("something", RefractTypes.date);
    expect(value.type).to.equal(GraphQLString);
  });

  mocha.it('should create valid boolean', () => {
    const value = schemaBuilder.buildType<number>("something", RefractTypes.number);
    expect(value.type).to.equal(GraphQLFloat);
  });
});