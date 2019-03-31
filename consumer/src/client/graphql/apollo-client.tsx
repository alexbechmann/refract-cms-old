import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';

const link = new HttpLink({ uri: `/cms/public/graphql` });

const cache = new InMemoryCache({
  addTypename: false
});

export const apolloClient = new ApolloClient({
  link,
  cache
});
