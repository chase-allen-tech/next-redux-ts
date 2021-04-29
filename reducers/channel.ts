import {
    GET_CHANNELS,
    ADD_CHANNEL,
} from '../constants/actionTypes';

export const initialState = {
    data: [],
};
  

const channel = (state = initialState, action) => {
    const { type, items, } = action;

    switch (type) {
        case GET_CHANNELS: {
            return { ...state.data };
        }

        case ADD_CHANNEL: {
            if (items === '') { return state; }
            return { ...state, data: Array.from(new Set([...state.data, ...items]))};
        }
        default: {
            return state;
        }
    }
};

export default channel;
