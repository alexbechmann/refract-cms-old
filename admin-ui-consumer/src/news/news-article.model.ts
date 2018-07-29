import { entity, property } from "@headless-cms/admin-ui";

@entity({
  alias: 'newsArticle'
})
class NewsArticle {
  @property({
    displayName: 'Headline'
  })
  headline: string;
}

export default NewsArticle;