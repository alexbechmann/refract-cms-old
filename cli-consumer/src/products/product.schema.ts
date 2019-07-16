import {
  composeSchema,
  createTextEditor,
  createLocationEditor,
  createSingleDropdownEditor,
  createMultipleDropdownEditor,
  Entity,
  Location,
  createBooleanEditor
} from '@refract-cms/core';
import CustomDropdownEditor from '../shared/CustomDropdownEditor';
import ScatterPlotIcon from '@material-ui/icons/ScatterPlot';

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
      displayName: 'Title',
      editorComponent: createTextEditor({
        maxLength: 30
      }),
      defaultValue: '',
      type: String
    },
    productType: {
      displayName: 'Product type',
      editorComponent: createTextEditor({ maxLength: 10 }),
      defaultValue: 'default',
      type: String
    },
    customNumber: {
      displayName: 'Custom number',
      defaultValue: 3,
      editorComponent: CustomDropdownEditor,
      type: Number
    },
    requiredForCustomDropdownEditor: {
      type: String,
      editorComponent: createTextEditor(),
      displayName: 'For DP Editor'
    },
    location: {
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
      displayName: 'Category',
      editorComponent: createSingleDropdownEditor({
        selectOptions: ['Electronics', 'Food']
      }),
      type: String
    },
    types: {
      displayName: 'Types',
      editorComponent: createMultipleDropdownEditor({
        selectOptions: ['Type1', 'Type2']
      }),
      type: [String]
    },
    // commaSeperatedTypes: {
    //   mode: 'resolve',
    //   type: String,
    //   resolve: ({ types }) => (types ? types.join(',') : '')
    // }
    primary: {
      type: Boolean,
      editorComponent: createBooleanEditor()
    }
  }
});
