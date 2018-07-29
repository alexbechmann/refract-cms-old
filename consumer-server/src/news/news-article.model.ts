import { entity, property } from "@headless-cms/server";

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