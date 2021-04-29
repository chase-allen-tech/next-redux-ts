import {
    GET_CONTRACTS,
    ADD_CONTRACT,
} from '../constants/actionTypes';

export const initialState = {
    data: [],
};

const contract = (state = initialState, action) => {
    const { type, items, } = action;

    switch (type) {
        case GET_CONTRACTS: {
            return { ...state.data };
        }

        case ADD_CONTRACT: {
            if (items === '') { return state; }
            return { ...state, data: Array.from(new Set([...state.data, ...items]))};
        }
        default: {
            return state;
        }
    }
};
export default contract;