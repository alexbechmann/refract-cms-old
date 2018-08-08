import { defineEntity, TextEditor, EntityPickerEditor } from '@firestore-cms/core';

export interface Article {
  title: string;
  relatedProducts: firebase.firestore.DocumentReference[];
  articleText: string;
}

export default defineEntity<Article>({
  alias: 'newsArticle',
  displayName: 'News Article'
})({
  title: {
    displayName: 'Headline',
    editorComponent: TextEditor({
      maxLength: 100
    }),
    defaultValue: 'default headline'
  },
  relatedProducts: {
    displayName: 'Related Products',
    editorComponent: EntityPickerEditor({
      max: 2,
      entityAlias: 'product'
    })
  },
  articleText: {
    displayName: 'Article text',
    editorComponent: TextEditor({
      maxLength: 100,
      multiline: true
    }),
    defaultValue: ''
  }
});
