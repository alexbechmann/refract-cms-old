import React from 'react';
import { Entity, defineEntity, createTextEditor, RefractTypes } from '@refract-cms/core';
import DetailsIcon from '@material-ui/icons/Details';

export interface Example extends Entity {
  myProperty: string;
}

export interface ExampleModel extends Example {}

export const ExampleSchema = defineEntity<Example, ExampleModel>({
  options: {
    alias: 'example',
    displayName: 'Example',
    icon: DetailsIcon
  },
  properties: {
    myProperty: {
      displayName: 'MyProperty',
      editorComponent: createTextEditor({
        maxLength: 50
      }),
      defaultValue: 'Something',
      type: RefractTypes.string
    }
  }
});
