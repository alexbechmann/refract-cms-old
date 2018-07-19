import { entity, register, getAllEntities, property } from '@headless-cms/core';

@entity({
  alias: 'product'
})
class Product {
  @property({
    editorAlias: 'textEditor'
  })
  type: string;
}

register(Product);
console.log(Product, getAllEntities());
