import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { NewsArticleModel } from '../../refract-cms/news/news-article.schema';
import { CircularProgress, Typography } from '@material-ui/core';

const NEWS_QUERY = gql`
  {
    news: newsArticleGetAll {
      _id
      title
      articleText
      imageModel {
        crops {
          profile
          large
        }
      }
    }
  }
`;

const News = () => (
  <div>
    <Query<{ news: NewsArticleModel[] }> query={NEWS_QUERY}>
      {({ loading, error, data }) => (
        <div>
          {loading ? (
            <CircularProgress />
          ) : (
            <div>
              <Typography>News</Typography>
              <ul>
                {data.news.map(article => {
                  return (
                    <li key={article._id}>
                      {article.title}
                      {article.imageModel && <img style={{ width: 100 }} src={article.imageModel.crops.profile} />}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}
    </Query>
  </div>
);

export default News;
