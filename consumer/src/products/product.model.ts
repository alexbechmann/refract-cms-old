import { defineEntity, TextEditor}  from "@firestore-cms/core";
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
      maxLength: 10
    }),
    defaultValue: 'default'
  },
  customNumber: {
    displayName: 'Custom number',
    editorComponent: CustomDropdown,
    defaultValue: 3
  }});