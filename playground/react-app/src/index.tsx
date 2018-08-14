import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { configureFirestoreCms } from '@firestore-cms/core';
import Product from './products/product.model';
import NewsArticle from './news/news-article.model';
import Settings from './settings/settings.model';
import 'typeface-roboto';

configureFirestoreCms({
  schema: [Product, NewsArticle, Settings],
  serverUrl: 'http://localhost:3500/cms'
});

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
