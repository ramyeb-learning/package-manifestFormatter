import {verifyManifest} from '../src/formatter'

import * as fs from 'fs';
import path from 'path';

const manifest = JSON.parse(fs.readFileSync(path.join(__dirname,'test.schema.json'), 'utf-8'));


describe('Verify ID', () => {
  let testManifest = Object.assign({}, manifest);
  test('id is lowercase : should return true', () => {
    testManifest.id = "test";
    expect(verifyManifest(testManifest, {disableState: true})).toBe(true);
  });
  test('id is UPPERCASE : should return false', () => {
    testManifest.id = "TEST";
    expect(verifyManifest(testManifest, {disableState: true})).toBe(false);
  });
  test('id contain non-alphabetic chars : should return false', () => {
    testManifest.id = "123";
    expect(verifyManifest(testManifest, {disableState: true})).toBe(false);
  });
});

describe('Verify manifestVersion', () => {
  let testManifest = Object.assign({}, manifest);
  test('manifestVersion is string : should return false', () => {
    testManifest.manifestVersion = "test";
    expect(verifyManifest(testManifest, {disableState: true})).toBe(false);
  });
});