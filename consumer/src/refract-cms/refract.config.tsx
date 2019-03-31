import { configure, FileSchema } from '@refract-cms/core';
import { ProductSchema } from './products/product.model';
import { NewsArticleSchema } from './news/news-article.schema';
import { SettingsSchema } from './settings/settings.model';

export default configure({
  schema: [ProductSchema, NewsArticleSchema, SettingsSchema, FileSchema]
});
