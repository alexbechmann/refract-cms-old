import { defineEntity, TextEditor, EntityPickerEditor } from '@firestore-cms/core';

export interface Article {
  title: string;
  // relatedProductsIds: string[];
  relatedProducts: firebase.firestore.DocumentReference[];
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
      max: 10,
      entityAlias: 'product'
    })
  }
});
