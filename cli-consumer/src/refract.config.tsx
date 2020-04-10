import { NewsArticleSchema } from './schemas/news/news-article.schema';
import { SettingsSchema } from './schemas/settings/settings.schema';
import { ProductSchema } from './schemas/products/product.schema';
import config from '@refract-cms/create-app/starter-schema-configs/blog/refract.config';
import { configureCli } from '@refract-cms/cli';
import { pink, indigo } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core';
import { FileSystemImageSchema } from '@refract-cms/plugin-file-system-image';

export default configureCli({
  path: '/',
  schema: [NewsArticleSchema, SettingsSchema, ProductSchema, ...config.schema, FileSystemImageSchema],
  theme: createMuiTheme({
    palette: {
      type: 'light',
      primary: {
        main: indigo[500]
      },
      secondary: {
        main: pink[500]
      }
    }
  }),
  serverConfig: () => import('./server/server.config').then(({ serverConfig }) => serverConfig)
});
