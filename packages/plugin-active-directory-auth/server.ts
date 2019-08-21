import { createServerPlugin } from '@refract-cms/server';
import { activeDirectoryPluginConfig } from './';

export const aciveDirectoryServerPlugin = createServerPlugin(activeDirectoryPluginConfig, {
  events: {
    onSchemaBuilt: () => console.log('hi from ad plugin')
  }
});
