import {
    GET_CHANNELS,
    ADD_CHANNEL,
} from '../constants/actionTypes';

export const initialState = {
    item: {
        value: '',
    },
    data: [],
};

const channel = (state = initialState, action) => {
    const { type, item, } = action;

    switch (type) {
        case GET_CHANNELS: {
            return Object.assign({}, state, {
                item,
            });
        }

        case ADD_CHANNEL: {
            if (item.value === '') {
                return state;
            }

            return Object.assign({}, state, {
                item: {
                    value: '',
                },
                data: [
                    ...(state.data),
                    item,
                ],
            });
        }
        default: {
            return state;
        }
    }
};

export default channel;
