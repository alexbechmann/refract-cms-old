import { createServerPlugin } from '@refract-cms/server';
import { composeSchema, createTextEditor, PluginConfig } from '@refract-cms/core';
import PersonIcon from '@material-ui/icons/Person';

const examplePluginConfig: PluginConfig = {
  name: 'Example',
  schema: []
};

export const exampleServerPlugin = createServerPlugin(examplePluginConfig, {
  events: {
    onSchemaBuilt: () => console.log('hi from plugin')
  }
});
