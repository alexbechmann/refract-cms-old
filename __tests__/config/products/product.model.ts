import {
  createTextEditor,
  createLocationEditor,
  createSingleDropdownEditor,
  createMultipleDropdownEditor,
  createListEditor,
  Entity,
  defineEntity,
  Location,
  RefractTypes
} from '@refract-cms/core';
import ScatterPlotIcon from '@material-ui/icons/ScatterPlot';
import CustomDropdownEditor from '../shared/CustomDropdownEditor';

export interface Product extends Entity {
  productType: string;
  customNumber: number;
  location: Location;
  title: string;
  category: string;
  types: string[];
}

export const ProductSchema = defineEntity<Product>({
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
    productType: {
      displayName: 'Product type',
      editorComponent: createTextEditor({ maxLength: 10 }),
      defaultValue: 'default',
      type: RefractTypes.string
    },
    customNumber: {
      displayName: 'Custom number',
      defaultValue: 3,
      editorComponent: CustomDropdownEditor,
      type: RefractTypes.number
    },
    location: {
      displayName: 'Location',
      editorComponent: createLocationEditor,
      defaultValue: {
        longitude: 15,
        latitude: 23
      },
      type: RefractTypes.shape({
        latitude: RefractTypes.number,
        longitude: RefractTypes.number
      })
    },
    title: {
      displayName: 'Title',
      editorComponent: createTextEditor({
        maxLength: 30
      }),
      defaultValue: '',
      type: RefractTypes.string
    },
    category: {
      displayName: 'Category',
      editorComponent: createSingleDropdownEditor({
        selectOptions: ['Electronics', 'Food']
      }),
      type: RefractTypes.string
    },
    types: {
      displayName: 'Types',
      editorComponent: createMultipleDropdownEditor({
        selectOptions: ['Type1', 'Type2']
      }),
      type: RefractTypes.arrayOf(RefractTypes.string)
    }
  }
});

const F = RefractTypes.arrayOf(RefractTypes.number);
