import { configure } from '@refract-cms/core';
import { ProductSchema } from './products/product.model';
import { NewsArticleSchema } from './news/news-article.model';
import { SettingsSchema } from './settings/settings.model';

export const config = configure({
  schema: [ProductSchema, NewsArticleSchema, SettingsSchema]
});
