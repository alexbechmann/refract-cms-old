import * as React from 'react';
import { Entity, defineEntity, TextEditor, EntityPickerEditor, DatePickerEditor, ListEditor } from '@refract-cms/core';
import { NewsArticle } from './news-article.model';

export interface NewsArticle extends Entity {
  title: string;
  articleText: string;
  relevantProductsIds: string[];
  extraText: string;
  articleDate: Date;
  listOfStrings: string[];
}

export const NewsArticleSchema = defineEntity<NewsArticle>({
  alias: 'newsArticle',
  displayName: 'News Article',
  instanceDisplayName: newsArticle => newsArticle.title
})({
  title: {
    displayName: 'Headline',
    editorComponent: TextEditor({
      maxLength: 100
    }),
    defaultValue: 'default headline'
  },

  articleText: {
    displayName: 'Article text',
    editorComponent: TextEditor({
      maxLength: 100,
      multiline: true
    }),
    defaultValue: ''
  },
  relevantProductsIds: {
    displayName: 'Relevant Products',
    editorComponent: EntityPickerEditor({
      entityAlias: 'product',
      max: 4
    })
  },
  extraText: {
    displayName: 'Extra text',
    editorComponent: props => <input value={props.value} onChange={e => props.setValue(e.target.value)} />
  },
  articleDate: {
    displayName: 'Article date',
    editorComponent: DatePickerEditor()
  },
  listOfStrings: {
    editorComponent: ListEditor({
      itemComponent: TextEditor(),
      max: 4
    }),
    defaultValue: ['s1', 's2']
  }
});
