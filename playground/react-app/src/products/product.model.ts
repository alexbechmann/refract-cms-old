import {
  defineEntity,
  TextEditor,
  MediaPickerEditor,
  LocationEditor,
  SingleDropdownEditor,
  MultipleDropdownEditor,
  ListEditor,
  Entity,
  Location,
  MediaItem
} from '@refract-cms/core';
import CustomDropdownEditor from '../property-editors/CustomDropdownEditor';

export interface Product extends Entity {
  productType: string;
  customNumber: number;
  location: Location;
  title: string;
  image: MediaItem;
  category: string;
  types: string[];
  extraImages: MediaItem[];
}

export const ProductSchema = defineEntity<Product>({
  alias: 'product',
  displayName: 'Product',
  instanceDisplayName: product => `${product.title} (${product.productType})`
})({
  productType: {
    displayName: 'Product type',
    editorComponent: TextEditor({ maxLength: 10 }),
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
      longitude: 15,
      latitude: 23
    }
  },
  title: {
    displayName: 'Title',
    editorComponent: TextEditor({
      maxLength: 30
    }),
    defaultValue: ''
  },
  category: {
    displayName: 'Category',
    editorComponent: SingleDropdownEditor({
      selectOptions: ['Electronics', 'Food']
    })
  },
  types: {
    displayName: 'Types',
    editorComponent: MultipleDropdownEditor({
      selectOptions: ['Type1', 'Type2']
    })
  },
  image: {
    displayName: 'Image',
    editorComponent: MediaPickerEditor({
      allowedFileTypes: ['jpg'],
      namedCrops: {
        main: {
          height: 400,
          width: 300
        }
      }
    })
  },
  extraImages: {
    editorComponent: ListEditor({
      itemComponent: MediaPickerEditor({
        allowedFileTypes: ['jpg'],
        namedCrops: {
          main: {
            height: 400,
            width: 500
          }
        }
      }),
      max: 5
    })
  }
});
