import React from 'react';
import {
  Entity,
  composeSchema,
  createTextEditor,
  createMultipleEntityPickerEditor,
  propertyBuilder
} from '@refract-cms/core';
import SettingsIcon from '@material-ui/icons/Settings';
import { NewsArticleSchema } from '../news/news-article.schema';
import { Switch, Button } from '@material-ui/core';

export const SettingsSchema = composeSchema({
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
      type: String
    },
    enableMyFeature: {
      displayName: 'My Feature active',
      type: Boolean,
      editorComponent: props => <Switch checked={props.value} onChange={(e, checked) => props.setValue(checked)} />
    },
    highlightedArticles: propertyBuilder.multipleReferences(NewsArticleSchema, {
      displayName: 'Highlighted articles'
    }),
    favouriteFood: {
      displayName: 'Fav food',
      editorComponent: props => (
        <div>
          {props.value && JSON.stringify(props.value)}
          <Button onClick={() => props.setValue([{ name: 'apple', kind: 'fruit' }])}>Click</Button>
        </div>
      ),
      type: [
        {
          kind: String,
          name: String
        }
      ]
    }
  }
});
