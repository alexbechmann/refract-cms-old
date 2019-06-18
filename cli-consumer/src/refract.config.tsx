import React from 'react';
import { configure, FileSystemImageSchema } from '@refract-cms/core';
import { NewsArticleSchema } from './news/news-article.schema';
import { SettingsSchema } from './settings/settings.schema';
import { ProductSchema } from './products/product.schema';
import config from '../../packages/create-app/starter-schema-configs/blog/refract.config';

export default configure({
  schema: [ProductSchema, NewsArticleSchema, SettingsSchema, ...config.schema]
});
