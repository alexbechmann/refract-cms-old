import { Entity, defineEntity, createTextEditor, RefractTypes } from '@refract-cms/core';
import SettingsIcon from '@material-ui/icons/Settings';

export interface Settings extends Entity {
  setting1: string;
}

export const SettingsSchema = defineEntity<Settings>({
  options: {
    alias: 'settings',
    displayName: 'Settings',
    maxOne: true,
    icon: SettingsIcon
  },
  properties: {
    setting1: {
      displayName: 'Setting1',
      editorComponent: createTextEditor({
        maxLength: 50
      }),
      defaultValue: 'Something',
      type: RefractTypes.string
    }
  }
});
