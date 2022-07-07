import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
} from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'https://api-us-east-1.graphcms.com/v2/cl5b4hot504ni01rshkjyaqu1/master',
  fetch,
});

const cache = new InMemoryCache();

export const apolloClint = new ApolloClient({
  link: from([httpLink]),
  cache,
});
