import React from 'react';
import { Entity, composeSchema, createTextEditor, createMultipleEntityPickerEditor } from '@refract-cms/core';
import SettingsIcon from '@material-ui/icons/Settings';
import { NewsArticleSchema } from '../news/news-article.schema';
import { Switch } from '@material-ui/core';

export const SettingsSchema = composeSchema({
  options: {
    alias: 'settings',
    displayName: 'Settings',
    maxOne: true,
    icon: SettingsIcon
  },
  properties: {
    setting1: {
      mode: 'edit',
      displayName: 'Setting1',
      editorComponent: createTextEditor({
        maxLength: 50
      }),
      defaultValue: 'Something',
      type: String
    },
    enableMyFeature: {
      mode: 'edit',
      displayName: 'My Feature active',
      type: Boolean,
      editorComponent: props => <Switch checked={props.value} onChange={(e, checked) => props.setValue(checked)} />
    },
    highlightedArticleIds: {
      mode: 'edit',
      displayName: 'Highlighted articles',
      type: [String],
      editorComponent: createMultipleEntityPickerEditor({
        schema: NewsArticleSchema
      })
    }
  }
});
