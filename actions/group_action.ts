import {
    ADD_GROUP, GET_GROUPS
} from '../constants/actionTypes';


export const getGroups = (item) => async dispatch => {
    
    dispatch({ type: GET_GROUPS, item });
}
export const addGroup = (item) => ({ type: ADD_GROUP, item });
