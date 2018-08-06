import { defineEntity, TextEditor} from "@firestore-cms/core";

export interface Settings {
  setting1: string;
}

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