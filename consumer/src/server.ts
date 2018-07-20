import { entity, register, getAllEntities, property, setupExpress } from '@headless-cms/core';
import * as express from 'express';
const app = express();

@entity({
  alias: 'product'
})
class Product {
  @property({
    editorAlias: 'text'
  })
  type: string;
}

@entity({
  alias: 'newsArticle'
})
class NewsArticle {
  @property({
    editorAlias: 'text'
  })
  headline: string;
}

register(Product, NewsArticle);
console.log(getAllEntities());

setupExpress(app);
app.listen(3300, () => console.log('Example app listening on port 33300!'))