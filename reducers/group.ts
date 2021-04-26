import {
    GET_GROUPS,
    ADD_GROUP,
} from '../constants/actionTypes';

export const initialState = {
    item: {
        value: '',
    },
    data: [],
};

const group = (state = initialState, action) => {
    const { type, item, } = action;

    switch (type) {
        case GET_GROUPS: {
            return { ...state, item }
            // return Object.assign({}, state, {
            //     item,
            // });
        }

        case ADD_GROUP: {
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
export default group;