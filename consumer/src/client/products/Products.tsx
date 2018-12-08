import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Product } from '../../refract-cms/products/product.model';
import { CircularProgress, Typography } from '@material-ui/core';

const PRODUCTS_QUERY = gql`
  {
    products: productGetAll {
      title
      category
      types
    }
  }
`;

const Products = () => (
  <div>
    <Query<{ products: Product[] }> query={PRODUCTS_QUERY}>
      {({ loading, error, data }) => (
        <div>
          {loading ? (
            <CircularProgress />
          ) : (
            <div>
              <Typography>Typography</Typography>
              <ul>
                {data.products.map(product => {
                  return <li key={product._id}>{product.title}</li>;
                })}
              </ul>
            </div>
          )}
        </div>
      )}
    </Query>
  </div>
);

export default Products;
