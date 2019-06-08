import React from 'react';
import mocha from 'mocha';
import chai from 'chai';
import { composeSchema, createTextEditor, Entity, createListEditor } from '../../packages/core/src';

const expect = chai.expect;

mocha.describe('property types', () => {
  mocha.it('1', () => {
    const SettingsSchema = composeSchema({
      options: {
        alias: 'settings',
        displayName: 'Settings',
        maxOne: true
      },
      properties: {
        setting1: {
          displayName: 'Setting1',
          editorComponent: createTextEditor({
            maxLength: 50
          }),
          defaultValue: 'Something',
          type: String
        },
        // listOfStrings: {
        //   editorComponent: createListEditor({
        //     itemComponent: createTextEditor(),
        //     max: 4,
        //     displayNameFormat: s => s
        //   }),
        //   defaultValue: ['s1', 's2'],
        //   type: [String]
        // },
        favouriteFood: {
          editorComponent: () => <p />,
          type: [
            {
              type: String,
              name: String
            }
          ]
        }
        // addresses: {
        //   type: RefractTypes.arrayOf(
        //     RefractTypes.shape({
        //       add1: RefractTypes.string,
        //       add2: RefractTypes.string,
        //       location: RefractTypes.shape({
        //         lat: RefractTypes.number,
        //         lng: RefractTypes.number
        //       })
        //     })
        //   )
        // }
      }
    });

    expect(SettingsSchema.options.alias).to.equal('settings');
  });
});
