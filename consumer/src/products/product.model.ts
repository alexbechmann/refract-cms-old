import { defineEntity, TextEditor, MediaPickerEditor, LocationEditor } from "@firestore-cms/core";
import CustomDropdownEditor from '../property-editors/CustomDropdownEditor';
import firebase from 'firebase';

export interface Product {
  productType: string;
  customNumber: number;
  location: firebase.firestore.GeoPoint;
  title: string;
  images: firebase.storage.Reference[];
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
    defaultValue: new firebase.firestore.GeoPoint(0, 0),
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