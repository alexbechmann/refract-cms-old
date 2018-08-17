import { defineEntity, TextEditor } from '@refract-cms/core';
import { Settings } from './settings.model';

export default defineEntity<Settings>({
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
