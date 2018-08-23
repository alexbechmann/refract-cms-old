import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as refract from '@refract-cms/core';
import { ProductSchema } from './products/product.model';
import { NewsArticleSchema } from './news/news-article.model';
import { SettingsSchema } from './settings/settings.model';
import 'typeface-roboto';

refract.configure({
  schema: [ProductSchema, NewsArticleSchema, SettingsSchema],
  serverUrl: 'http://localhost:3500'
});

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
