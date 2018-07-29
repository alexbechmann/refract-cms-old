import { entity, property } from "@headless-cms/admin-ui";
import CustomDropdown from '../property-editors/CustomDropdown';

@entity({
  alias: 'product'
})
class Product {
  @property({
    editorAlias: 'text'
  })
  type: string;

  @property({
    editorAlias: 'custom',
    editorComponent: CustomDropdown
  })
  customNumber: number;

} 

export default Product;