import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'typeface-roboto';
import { configureHeadlessCms } from '@headless-cms/admin-ui';
import Product from './products/product.model';
import NewsArticle from './news/news-article.model';
import Settings from './settings/settings.model';

const firebaseConfig = {
  apiKey: "AIzaSyD_ctkKvFL5OdIjeEBbQPWdQ-0QiKNB7bw",
  authDomain: "admin-ui-consumer-dev.firebaseapp.com",
  databaseURL: "https://admin-ui-consumer-dev.firebaseio.com",
  projectId: "admin-ui-consumer-dev",
  storageBucket: "admin-ui-consumer-dev.appspot.com",
  messagingSenderId: "975437661220"
};

configureHeadlessCms({
  serverUrl: "http://localhost:3300",
  schema: [Product, NewsArticle, Settings],
  firebaseConfig
})

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
 