import { ADD_CHANNEL, GET_CHANNELS, } from '../constants/actionTypes';

export const getChannels = item => ({ type: GET_CHANNELS, item });
export const addChannel = item => ({ type: ADD_CHANNEL, item });


