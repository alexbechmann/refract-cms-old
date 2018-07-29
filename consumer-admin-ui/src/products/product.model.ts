import { entity, property } from "@headless-cms/admin-ui";

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