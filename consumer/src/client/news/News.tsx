import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { NewsArticle } from '../../refract-cms/news/news-article.model';
import { CircularProgress, Typography } from '@material-ui/core';
import { fileService } from '@refract-cms/core';

const NEWS_QUERY = gql`
  {
    news: newsArticleGetAll {
      title
      articleText
      image {
        imageId
        imageUrl
        crops {
          profile {
            pixelCrop {
              height
              width
              y
              x
            }
          }
        }
      }
    }
  }
`;

const News = () => (
  <div>
    <Query<{ news: NewsArticle[] }> query={NEWS_QUERY}>
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
                      <img src={fileService.buildImageUrl(article.image, article.image.crops.profile)} />
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
