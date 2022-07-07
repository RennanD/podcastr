import * as Types from './graphql';

import * as Operations from './graphql';
import { NextPage } from 'next';
import { NextRouter, useRouter } from 'next/router'
import { QueryHookOptions, useQuery } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type React from 'react';
import { getApolloClient , ApolloClientContext} from '../../lib/withApollo';
export async function getServerPageGetAllEpisode
    (options: Omit<Apollo.QueryOptions<Types.GetAllEpisodeQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.GetAllEpisodeQuery>({ ...options, query: Operations.GetAllEpisodeDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useGetAllEpisode = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetAllEpisodeQuery, Types.GetAllEpisodeQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetAllEpisodeDocument, options);
};
export type PageGetAllEpisodeComp = React.FC<{data?: Types.GetAllEpisodeQuery, error?: Apollo.ApolloError}>;
export const withPageGetAllEpisode = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetAllEpisodeQuery, Types.GetAllEpisodeQueryVariables>) => (WrappedComponent:PageGetAllEpisodeComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.GetAllEpisodeDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrGetAllEpisode = {
      getServerPage: getServerPageGetAllEpisode,
      withPage: withPageGetAllEpisode,
      usePage: useGetAllEpisode,
    }