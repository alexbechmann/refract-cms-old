import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as refract from '@refract-cms/core';
import productSchema from './products/product.schema';
import newsArticleSchema from './news/news-article.schema';
import settingsSchema from './settings/settings.schema';
import 'typeface-roboto';

refract.configure({
  schema: [productSchema, newsArticleSchema, settingsSchema],
  serverUrl: 'http://localhost:3500'
});

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
