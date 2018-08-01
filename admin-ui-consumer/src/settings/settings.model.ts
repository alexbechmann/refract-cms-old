import { entity, property, TextEditor } from "@headless-cms/admin-ui";

@entity({
  alias: 'settings',
  displayName: 'Settings',
  maxOne: true 
})
class Settings {
  @property({
    displayName: 'Setting1',
    editorComponent: TextEditor({
      maxLength: 50
    }),
    defaultValue: 'Something'
  })
  setting1: string;
}

export default Settings;