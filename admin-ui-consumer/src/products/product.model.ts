import { entity, property, TextEditor } from "@headless-cms/admin-ui";
import CustomDropdown from '../property-editors/CustomDropdown';

@entity({
  alias: 'product',
  displayName: 'Product'
})
class Product {
  @property<string>({
    displayName: 'Product type',
    editorComponent: TextEditor({
      maxLength: 3
    }),
    defaultValue: ''
  })
  productType: string;

  @property<number>({
    displayName: 'Custom number',
    editorComponent: CustomDropdown,
    defaultValue: 1
  })
  customNumber: number;
} 

export default Product;