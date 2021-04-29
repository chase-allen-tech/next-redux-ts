import {
    GET_ENTITIES,
    ADD_ENTITY,
} from '../constants/actionTypes';

export const initialState = {
    data: [],
};

const entity = (state = initialState, action) => {
    const { type, items, } = action;

    switch (type) {
        case GET_ENTITIES: {
            return { ...state.data };
        }

        case ADD_ENTITY: {
            if (items.length == 0) { return state; }
            return { ...state, data: Array.from(new Set([...state.data, ...items]))};
        }
        default: {
            return state;
        }
    }
};

export default entity;