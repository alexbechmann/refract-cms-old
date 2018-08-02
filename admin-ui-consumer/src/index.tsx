import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'typeface-roboto';
import { configureHeadlessCms } from '@headless-cms/admin-ui';
import Product from './products/product.model';
import NewsArticle from './news/news-article.model';
import Settings from './settings/settings.model';

configureHeadlessCms({
  serverUrl: "http://localhost:3300",
  schema: [Product, NewsArticle, Settings]
})

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
 