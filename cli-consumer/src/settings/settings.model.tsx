import React from 'react';
import {
  Entity,
  defineEntity,
  createTextEditor,
  RefractTypes,
  createMultipleEntityPickerEditor
} from '@refract-cms/core';
import SettingsIcon from '@material-ui/icons/Settings';
import { NewsArticleSchema, NewsArticleModel } from '../news/news-article.schema';
import { Switch } from '@material-ui/core';

export interface Settings extends Entity {
  setting1: string;
  enableMyFeature: boolean;
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
    enableMyFeature: {
      displayName: 'My Feature active',
      type: RefractTypes.bool,
      editorComponent: props => <Switch checked={props.value} onChange={(e, checked) => props.setValue(checked)} />
    },
    highlightedArticleIds: {
      displayName: 'Highlighted articles',
      type: RefractTypes.arrayOf(RefractTypes.string),
      editorComponent: createMultipleEntityPickerEditor({
        schema: NewsArticleSchema
      })
    }
  }
});
