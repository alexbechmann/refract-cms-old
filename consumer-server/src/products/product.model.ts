import { entity, property } from "@headless-cms/server";

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