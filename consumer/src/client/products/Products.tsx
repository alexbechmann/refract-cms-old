import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { CircularProgress, Typography } from '@material-ui/core';
import { ProductModel } from 'consumer/src/refract-cms/products/product.schema';

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
    <Query<{ products: ProductModel[] }> query={PRODUCTS_QUERY}>
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
