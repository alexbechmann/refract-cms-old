import { configure } from '@refract-cms/core';
import { ProductSchema } from './products/product.schema';
import { NewsArticleSchema } from './news/news-article.schema';
import { SettingsSchema } from './settings/settings.schema';

export default configure({
  schema: [ProductSchema, NewsArticleSchema, SettingsSchema]
});
