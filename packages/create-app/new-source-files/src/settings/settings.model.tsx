import React from 'react';
import { Entity, defineEntity, createTextEditor, RefractTypes } from '@refract-cms/core';
import SettingsIcon from '@material-ui/icons/Settings';
import { Switch } from '@material-ui/core';

// Some example global settings, Entity options has maxOne: true, so you can use this entity for global site level options
export interface Settings extends Entity {
  siteAuthor: string;
  enableMyFeature: boolean;
}

export interface SettingsModel extends Settings {}

export const SettingsSchema = defineEntity<Settings, SettingsModel>({
  options: {
    alias: 'settings',
    displayName: 'Settings',
    maxOne: true,
    icon: SettingsIcon
  },
  properties: {
    siteAuthor: {
      displayName: 'Site Author',
      editorComponent: createTextEditor({
        maxLength: 50
      }),
      defaultValue: 'Something',
      type: RefractTypes.string
    },
    enableMyFeature: {
      displayName: 'My Feature active',
      type: RefractTypes.bool,
      editorComponent: props => <Switch checked={props.value} onChange={(e, checked) => props.setValue(checked)} />
    }
  }
});
