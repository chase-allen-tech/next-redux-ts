import {
    GET_ENTITIES,
    ADD_ENTITY,
} from '../constants/actionTypes';

export const initialState = {
    item: {
        value: '',
    },
    data: [],
};

const entity = (state = initialState, action) => {
    const { type, item, } = action;

    switch (type) {
        case GET_ENTITIES: {
            return Object.assign({}, state, {
                item,
            });
        }

        case ADD_ENTITY: {
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

export default entity;