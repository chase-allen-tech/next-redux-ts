import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

import { ADD_CHANNEL, GET_CHANNELS, } from '../constants/actionTypes';
import { Q_GET_CHANNELS } from '../constants/gqlQueries';

export const getChannels = item => async dispatch => {
    const client = new ApolloClient({
        uri: 'https://preprod.smart4.digital/admin',
        cache: new InMemoryCache()
    });
    let result = await client.query({ query: gql(Q_GET_CHANNELS) });
    console.log(result);
    dispatch({ type: ADD_CHANNEL, item });
    // return { type: GET_CHANNELS, item };
};

export const addChannel = (item) => async dispatch => {
    const client = new ApolloClient({
        uri: 'https://preprod.smart4.digital/admin',
        cache: new InMemoryCache()
    });
    let result = await client.query({
        query: gql`
        {
            getMe {
              me {
                name
              }
            }
        }
        `
    });
    dispatch({ type: ADD_CHANNEL, item });
} 

