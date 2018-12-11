import mocha from 'mocha';
import chai from 'chai';
import { buildTypes } from '../packages/server/src/graphql/build-types';
import config from './config/refract.config';
import { printType } from 'graphql';

const expect = chai.expect;

mocha.describe('build types', () => {
  mocha.it('should create filters shape', () => {
    const types = buildTypes(config.schema[0]);
    const productlocation = types.find(t => t.name === "Productlocation")

    const expected = `
type Productlocation {
  latitude: Float
  longitude: Float
}
    `

    expect(printType(productlocation).trim()).to.equal(expected.trim());
  });

  mocha.it('should create filters shape', () => {
    const types = buildTypes(config.schema[0]);
    const productlocation = types.find(t => t.name === "FilterProductlocationlatitude")
    const expected = `
input FilterProductlocationlatitude {
  matches: Float
}
    `;
    expect(printType(productlocation).trim()).to.equal(expected.trim());
  });
});