import { PluginConfig } from '@refract-cms/core';
import { FileSystemImageSchema } from './file-system-image.schema';

export const fileSystemImagePluginConfig: PluginConfig = {
  name: 'fileSystemImage',
  schema: [FileSystemImageSchema]
};
