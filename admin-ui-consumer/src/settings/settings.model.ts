import { entity, property, TextEditor } from "@headless-cms/admin-ui";

@entity({
  alias: 'settings',
  displayName: 'Settings',
  allowMultiple: false 
})
class Settings {
  @property({
    displayName: 'Setting1',
    editorComponent: TextEditor({
      maxLength: 50
    })
  })
  setting1: string;
}

export default Settings;