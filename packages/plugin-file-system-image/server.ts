import { createServerPlugin } from '@refract-cms/server';
import { fileSystemImagePluginConfig } from './';

export const fileSystemImageServerPlugin = createServerPlugin(fileSystemImagePluginConfig, {
  events: {},
  resolverPlugins: [],
  configureRouter: router => {
    router.get('/', (req, res) => {
      res.send('hi');
    });
  }
});
