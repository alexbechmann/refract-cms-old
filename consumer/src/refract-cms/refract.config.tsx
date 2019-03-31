import { configure, FileSchema } from '@refract-cms/core';
import { NewsArticleSchema } from './news/news-article.schema';
import { SettingsSchema } from './settings/settings.model';
import { ProductSchema } from './products/product.schema';

export default configure({
  schema: [ProductSchema, NewsArticleSchema, SettingsSchema, FileSchema]
});
