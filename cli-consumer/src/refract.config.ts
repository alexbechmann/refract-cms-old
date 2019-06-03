import { configure, FileSchema, composeSchema, createTextEditor } from '@refract-cms/core';
// import { NewsArticleSchema } from './news/news-article.schema';
// import { SettingsSchema } from './settings/settings.model';
// import { ProductSchema } from './products/product.schema';

const ArticleSchema = composeSchema({
  options: { alias: 'article' },
  properties: {
    title: {
      mode: 'edit',
      type: String,
      editorComponent: createTextEditor(),
      defaultValue: 'hello',
      displayName: 'Text'
    }
  }
});

export default configure({
  // schema: [ProductSchema, NewsArticleSchema, SettingsSchema, FileSchema]
  schema: [ArticleSchema]
});
