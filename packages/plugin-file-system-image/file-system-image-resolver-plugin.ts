import { createResolverPlugin } from '@refract-cms/server';

export default createResolverPlugin({
  alias: 'fileSystemImage',
  buildFieldConfig: args => {
    return {
      args: {},
      resolve: () => {}
    };
  }
});
