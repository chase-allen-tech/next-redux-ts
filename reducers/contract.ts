import {
    GET_CONTRACTS,
    ADD_CONTRACT,
} from '../constants/actionTypes';

export const initialState = {
    item: {
        value: '',
    },
    data: [],
};

const contract =  (state = initialState, action) => {
    const { type, item, } = action;

    switch (type) {
        case GET_CONTRACTS: {
            return Object.assign({}, state, {
                item,
            });
        }

        case ADD_CONTRACT: {
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
export default contract;