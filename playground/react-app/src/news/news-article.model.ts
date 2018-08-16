import { defineEntity, TextEditor, EntityPickerEditor, Entity } from '@refract-cms/core';
import CustomDropdownEditor from '../property-editors/CustomDropdownEditor';

export interface NewsArticle extends Entity {
  title: string;
  customNumber: number;
  articleText: string;
  relevantProductsIds: string[];
}

export default defineEntity<NewsArticle>({
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
  customNumber: {
    displayName: 'Custom property editor',
    editorComponent: CustomDropdownEditor,
    defaultValue: 3
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
  }
});
