import {
  composeSchema,
  createTextEditor,
  createLocationEditor,
  createSingleDropdownEditor,
  createMultipleDropdownEditor,
  Entity,
  Location
} from '@refract-cms/core';
import CustomDropdownEditor from '../shared/CustomDropdownEditor';
import ScatterPlotIcon from '@material-ui/icons/ScatterPlot';

// export interface ProductEntity extends Entity {
//   productType: string;
//   customNumber: number;
//   location: Location;
//   title: string;
//   category: string;
//   types: string[];
// }

// export interface ProductModel extends ProductEntity {
//   someVar: string;
// }

export const ProductSchema = composeSchema({
  options: {
    alias: 'product',
    displayName: 'Product',
    instanceDisplayProps: product => ({
      primaryText: `${product.title}`,
      secondaryText: product.productType
    }),
    icon: ScatterPlotIcon
  },
  properties: {
    title: {
      mode: 'edit',
      displayName: 'Title',
      editorComponent: createTextEditor({
        maxLength: 30
      }),
      defaultValue: '',
      type: String
    },
    productType: {
      mode: 'edit',
      displayName: 'Product type',
      editorComponent: createTextEditor({ maxLength: 10 }),
      defaultValue: 'default',
      type: String
    },
    customNumber: {
      mode: 'edit',
      displayName: 'Custom number',
      defaultValue: 3,
      editorComponent: CustomDropdownEditor,
      type: Number
    },
    location: {
      mode: 'edit',
      displayName: 'Location',
      editorComponent: createLocationEditor(),
      defaultValue: {
        lng: 15,
        lat: 23
      },
      type: {
        lat: Number,
        lng: Number
      }
    },
    category: {
      mode: 'edit',
      displayName: 'Category',
      editorComponent: createSingleDropdownEditor({
        selectOptions: ['Electronics', 'Food']
      }),
      type: String
    },
    types: {
      mode: 'edit',
      displayName: 'Types',
      editorComponent: createMultipleDropdownEditor({
        selectOptions: ['Type1', 'Type2']
      }),
      type: [String]
    }
  }
});
