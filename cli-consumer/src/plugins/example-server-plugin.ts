import { ServerPlugin } from '@refract-cms/server';
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

const ExamplePluginConfig: PluginConfig = {
  name: 'Example',
  schema: [ActiveDirectoryUserSchema]
};

export const ExampleServerPlugin: ServerPlugin = {
  config: ExamplePluginConfig,
  events: {
    onSchemaBuilt: () => console.log('hi from plugin2')
  }
};
