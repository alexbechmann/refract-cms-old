import { defineEntity, TextEditor } from "@headless-cms/admin-ui";

export interface Article {
  title: string;
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
    defaultValue: "default headline"
  }
});