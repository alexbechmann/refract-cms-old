import { entity, property, TextEditor } from "@headless-cms/admin-ui";

@entity({
  alias: 'newsArticle'
})
class NewsArticle {
  @property({
    displayName: 'Headline',
    editorComponent: TextEditor({
      maxLength: 100
    })
  })
  headline: string;
}

export default NewsArticle;