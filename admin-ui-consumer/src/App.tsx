import * as React from 'react';
import { Admin } from '@headless-cms/admin-ui';
import Product from './products/product.model';
import NewsArticle from './news/news-article.model';

class App extends React.Component {
  render() {
    return (
      <div>
        <Admin serverUrl="http://localhost:3300" schemas={[Product, NewsArticle]} />
      </div>
    );
  }
}

export default App;
