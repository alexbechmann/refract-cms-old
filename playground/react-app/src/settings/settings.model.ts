import { Entity, defineEntity, TextEditor } from '@refract-cms/core';

export interface Settings extends Entity {
  setting1: string;
}

export const SettingsSchema = defineEntity<Settings>({
  alias: 'settings',
  displayName: 'Settings',
  maxOne: true
})({
  setting1: {
    displayName: 'Setting1',
    editorComponent: TextEditor({
      maxLength: 50
    }),
    defaultValue: 'Something'
  }
});
