import React from 'react';
import { configure, composeSchema, createTextEditor } from '@refract-cms/core';
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
    },
    location: {
      mode: 'edit',
      editorComponent: () => <p />,
      type: {
        lat: Number,
        lng: Number
      },
      displayName: 'Location'
    }
  }
});

export default configure({
  // schema: [ProductSchema, NewsArticleSchema, SettingsSchema, FileSchema]
  schema: [ArticleSchema]
});
