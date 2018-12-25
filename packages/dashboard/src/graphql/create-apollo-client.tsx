import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError, ErrorResponse } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';

export const createApolloClient = ({ serverUrl }: { serverUrl: string }) => {
  const httpLink = new HttpLink({ uri: `${serverUrl}/graphql` });
  const withTokenLink = setContext((operation, { headers }) =>
    Promise.resolve({
      headers: {
        ...headers,
        authorization: localStorage.getItem('access_token') || ''
      }
    })
  );
  const handleAuthErrorLink = onError(({ networkError, operation, forward }: ErrorResponse) => {
    if (networkError) {
      switch ((networkError as any).statusCode) {
        case 401: {
          console.log('login here');
          break;
        }
        default: {
          break;
        }
      }
    }
    return forward(operation);
  });
  const link = ApolloLink.from([withTokenLink, handleAuthErrorLink, httpLink]);
  const cache = new InMemoryCache({
    addTypename: false,
    dataIdFromObject: (o: any) => o._id
  });
  return new ApolloClient({
    link,
    cache
  });
};
