import {
  Entity,
  defineEntity,
  createTextEditor,
  RefractTypes,
  createMultipleEntityPickerEditor
} from '@refract-cms/core';
import SettingsIcon from '@material-ui/icons/Settings';
import { ProductSchema } from '../products/product.model';
import { NewsArticleSchema } from '../news/news-article.model';

export interface Settings extends Entity {
  setting1: string;
  // favouriteFood: {
  //   type: string;
  //   name: string;
  // }[];
  highlightedArticles: string[];
}

export const SettingsSchema = defineEntity<Settings>({
  options: {
    alias: 'settings',
    displayName: 'Settings',
    maxOne: true,
    icon: SettingsIcon
  },
  properties: {
    setting1: {
      displayName: 'Setting1',
      editorComponent: createTextEditor({
        maxLength: 50
      }),
      defaultValue: 'Something',
      type: RefractTypes.string
    },
    // favouriteFood: {
    //   type: RefractTypes.arrayOf(
    //     RefractTypes.shape({
    //       type: RefractTypes.string,
    //       name: RefractTypes.string
    //     })
    //   )
    // },
    highlightedArticles: {
      displayName: 'Highlighted articles',
      type: RefractTypes.arrayOf(RefractTypes.string),
      editorComponent: createMultipleEntityPickerEditor({
        schema: NewsArticleSchema
      })
    }
  }
});
