import * as React from 'react';
import { Admin } from '@headless-cms/admin-ui';
import Product from './products/product.model';
import NewsArticle from './news/news-article.model';
import Settings from './settings/settings.model';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div>
         <BrowserRouter>
          <Switch>
            <Route path={`/admin`} component={() => <Admin serverUrl="http://localhost:3300" schemas={[Product, NewsArticle, Settings]} />} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
