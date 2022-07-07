import { GetServerSidePropsContext, NextPage } from 'next';

import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  from,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

export type ApolloClientContext = GetServerSidePropsContext;

export function getApolloClient(
  _: ApolloClientContext,
  ssrCache?: NormalizedCacheObject,
) {
  const httpLink = createHttpLink({
    uri: 'https://api-us-east-1.graphcms.com/v2/cl5b4hot504ni01rshkjyaqu1/master',
    fetch,
  });

  const cache = new InMemoryCache().restore(ssrCache ?? {});

  const apolloClint = new ApolloClient({
    link: from([httpLink]),
    cache,
  });
  return apolloClint;
}

export const withApollo = (Component: NextPage) => {
  return function Provider({ apolloState, ...rest }) {
    return (
      <ApolloProvider client={getApolloClient(undefined, apolloState)}>
        <Component {...rest} />
      </ApolloProvider>
    );
  };
};
