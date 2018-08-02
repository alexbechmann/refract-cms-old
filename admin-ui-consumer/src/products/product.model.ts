import { defineEntity, TextEditor}  from "@headless-cms/admin-ui";
import CustomDropdown from '../property-editors/CustomDropdown';

export interface Product {
  productType: string;
  customNumber: number;
}

export default defineEntity<Product>({
  alias: 'product',
  displayName: 'Product'
})({
  productType: {
    displayName: 'Product type',
    editorComponent: TextEditor({
      maxLength: 3
    }),
    defaultValue: ''
  },
  customNumber: {
    displayName: 'Custom number',
    editorComponent: CustomDropdown,
    defaultValue: 1
  }}
)