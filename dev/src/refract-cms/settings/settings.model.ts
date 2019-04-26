import {
  Entity,
  defineEntity,
  createTextEditor,
  RefractTypes,
  createMultipleEntityPickerEditor
} from '@refract-cms/core';
import SettingsIcon from '@material-ui/icons/Settings';
import { NewsArticleSchema, NewsArticleModel } from '../news/news-article.schema';

export interface Settings extends Entity {
  setting1: string;
  // favouriteFood: {
  //   type: string;
  //   name: string;
  // }[];
  highlightedArticleIds: string[];
}

export interface SettingsModel extends Settings {
  highlightedArticles: NewsArticleModel[];
}

export const SettingsSchema = defineEntity<Settings, SettingsModel>({
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
    highlightedArticleIds: {
      displayName: 'Highlighted articles',
      type: RefractTypes.arrayOf(RefractTypes.string),
      editorComponent: createMultipleEntityPickerEditor({
        schema: NewsArticleSchema
      })
    }
  }
});
