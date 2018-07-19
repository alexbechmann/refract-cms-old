import { entity, register, getAllEntities } from '@headless-cms/core';

@entity({
  alias: 'product'
})
class Product {

}

console.log(Product);

register(Product);
console.log(getAllEntities());
