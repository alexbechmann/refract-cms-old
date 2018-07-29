import { entity, property } from "@headless-cms/admin-ui";
import CustomDropdown from '../property-editors/CustomDropdown';

@entity({
  alias: 'product'
})
class Product {
  @property({
    editorAlias: 'text',
    displayName: 'Product type'
  })
  productType: string;

  @property({
    editorAlias: 'custom',
    displayName: 'Customer number',
    editorComponent: CustomDropdown
  })
  customNumber: number;
} 

export default Product;