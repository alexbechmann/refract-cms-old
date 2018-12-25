import mocha from 'mocha';
import chai from 'chai';
import { defineEntity, createTextEditor, RefractTypes, Entity, createListEditor } from '../../packages/core/src';

const expect = chai.expect;


interface Settings extends Entity {
  setting1: string;
  listOfStrings: string[];
  favouriteFood: {
    type: string;
    name: string;
  }[];
  addresses: {
    add1: string;
    add2: string;
    location: {
      lat: number;
      lng: number;
    };
  }[];
}

mocha.describe('property types', () => {
  mocha.it('1', () => {
    const SettingsSchema = defineEntity<Settings>({
      options: {
        alias: 'settings',
        displayName: 'Settings',
        maxOne: true,
      },
      properties: {
        setting1: {
          displayName: 'Setting1',
          editorComponent: createTextEditor({
            maxLength: 50
          }),
          defaultValue: 'Something',
          type: RefractTypes.string
        },
      listOfStrings: {
        editorComponent: createListEditor({
          itemComponent: createTextEditor(),
          max: 4,
          displayNameFormat: s => s
        }),
        defaultValue: ['s1', 's2'],
        type: RefractTypes.arrayOf(RefractTypes.string)
      },
        favouriteFood: {
          type: RefractTypes.arrayOf(
            RefractTypes.shape({
              type: RefractTypes.string,
              name: RefractTypes.string,
            })
          )
        },
        addresses: {
          type: RefractTypes.arrayOf(
            RefractTypes.shape({
              add1: RefractTypes.string,
              add2: RefractTypes.string,
              location: RefractTypes.shape({
                lat: RefractTypes.number,
                lng: RefractTypes.number
              })
            })
          )
        }
      }
    });

    expect(SettingsSchema.options.alias).to.equal('settings');
  });
});

