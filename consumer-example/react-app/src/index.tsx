import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'typeface-roboto';
import { configureFirestoreCms } from '@firestore-cms/core';
import Product from './products/product.model';
import NewsArticle from './news/news-article.model';
import Settings from './settings/settings.model';
import { firebase } from '@firestore-cms/core';
import '@firestore-cms/core/node_modules/react-image-crop/dist/ReactCrop.css';

const firebaseConfig = {
  apiKey: 'AIzaSyD_ctkKvFL5OdIjeEBbQPWdQ-0QiKNB7bw',
  authDomain: 'admin-ui-consumer-dev.firebaseapp.com',
  databaseURL: 'https://admin-ui-consumer-dev.firebaseio.com',
  projectId: 'admin-ui-consumer-dev',
  storageBucket: 'admin-ui-consumer-dev.appspot.com',
  messagingSenderId: '975437661220'
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

configureFirestoreCms({
  schema: [Product, NewsArticle, Settings]
});

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
