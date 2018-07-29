import { entity, property } from "@headless-cms/admin-ui";

@entity({
  alias: 'newsArticle'
})
class NewsArticle {
  @property({
    editorAlias: 'text'
  })
  headline: string;
}

export default NewsArticle;