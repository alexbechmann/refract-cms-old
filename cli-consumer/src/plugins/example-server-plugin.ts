import { createServerPlugin } from '@refract-cms/server';
import { composeSchema, createTextEditor, PluginConfig } from '@refract-cms/core';
import PersonIcon from '@material-ui/icons/Person';

export const ActiveDirectoryUserSchema = composeSchema({
  options: {
    alias: 'adUser',
    displayName: 'AD User',
    icon: PersonIcon,
    instanceDisplayProps: author => ({
      primaryText: `${author.lastName}, ${author.firstName}`
    })
  },
  properties: {
    firstName: {
      displayName: 'First name(s)',
      editorComponent: createTextEditor(),
      type: String
    },
    lastName: {
      displayName: 'Surname',
      editorComponent: createTextEditor(),
      type: String
    }
  }
});

const examplePluginConfig: PluginConfig = {
  name: 'Example',
  schema: [ActiveDirectoryUserSchema]
};

export const exampleServerPlugin = createServerPlugin(examplePluginConfig, {
  events: {
    onSchemaBuilt: () => console.log('hi from plugin2')
  }
});
