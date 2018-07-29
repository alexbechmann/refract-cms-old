import { entity, property, TextEditor } from "@headless-cms/admin-ui";
import CustomDropdown from '../property-editors/CustomDropdown';

@entity({
  alias: 'product'
})
class Product {
  @property<string>({
    displayName: 'Product type',
    editorComponent: TextEditor({
      maxLength: 3
    })
  }) 
  productType: string;

  @property<number>({
    displayName: 'Customer number',
    editorComponent: CustomDropdown
  })
  customNumber: number;
} 

export default Product;