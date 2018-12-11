import mocha from 'mocha';
import chai from 'chai';
import { buildTypes } from '../packages/server/src/graphql/build-types';
import config from './config/refract.config';

const expect = chai.expect;

describe('build types', () => {
  it('should create filters shape', () => {
    const f = buildTypes(config.schema[0]);
    buildTypes(config.schema[1]);
    buildTypes(config.schema[2]);
    // console.log(f)
    expect(true).to.equal(false);
  });
});