import { entity, property } from "@headless-cms/core";

@entity({
  alias: 'product'
})
class Product {
  @property({
    editorAlias: 'text'
  })
  type: string;
} 

export default Product;