import { defineEntity, TextEditor, MediaItem, MediaPickerEditor } from "@firestore-cms/core";
import CustomDropdownEditor from '../property-editors/CustomDropdownEditor';
import LocationEditor from '../property-editors/LocationEditor';
import { Location } from '../shared/models/location.model';

export interface Product {
  productType: string;
  customNumber: number;
  location: Location;
  title: string;
  images: MediaItem[];
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
    editorComponent: CustomDropdownEditor,
    defaultValue: 3
  },
  location: {
    displayName: 'Location',
    editorComponent: LocationEditor,
    defaultValue: {
      lng: 500,
      lat: 500
    },
  },
  title: {
    displayName: 'Title',
    editorComponent: TextEditor({
      maxLength: 30
    }),
    defaultValue: ''
  },
  images: {
    displayName: 'Images',
    editorComponent: MediaPickerEditor({
      allowedFileTypes: ['jpg'],
      max: 1
    }),
    defaultValue: []
  }
});