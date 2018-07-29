import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Product from './products/product.model';
import NewsArticle from './news/news-article.model';
import { register } from '@headless-cms/admin-ui';

register(Product, NewsArticle);

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
 