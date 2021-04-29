import {
    GET_GROUPS,
    ADD_GROUP,
} from '../constants/actionTypes';

export const initialState = {
    data: [],
};


const group = (state = initialState, action) => {
    const { type, items, } = action;

    switch (type) {
        case GET_GROUPS: {
            return { ...state.data };
        }

        case ADD_GROUP: {
            if (items === '') { return state; }
            return { ...state, data: Array.from(new Set([...state.data, ...items]))};
        }
        default: {
            return state;
        }
    }
};
export default group;