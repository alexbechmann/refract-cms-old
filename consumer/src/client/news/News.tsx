import React from 'react';
import { graphql } from 'react-apollo';
import { NewsArticle } from '../../refract-config/news/news-article.model';
import { CircularProgress } from '@material-ui/core';
import gql from 'graphql-tag';

interface Data {
  news: NewsArticle[];
}

const NEWS_QUERY = gql`
  {
    news: newsArticleGetAll {
      _id
      title
      articleText
    }
  }
`;

const News = graphql<{}, Data>(NEWS_QUERY)(props => {
  if (props.data.loading) {
    return <CircularProgress />;
  } else if (props.data.error) {
    return <p>Error</p>;
  }
  return (
    <div>
      <h3>News</h3>
      <ul>
        {props.data.news.map(newsArticle => (
          <li>
            {newsArticle.title} - {newsArticle.articleText} (id: {newsArticle._id})
          </li>
        ))}
      </ul>
    </div>
  );
});

export default News;
