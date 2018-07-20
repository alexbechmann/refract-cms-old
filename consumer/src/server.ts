import { entity, register, getAllEntities, property } from '@headless-cms/core';

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
