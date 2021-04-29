import { ADD_ENTITY, GET_ENTITIES, } from '../constants/actionTypes';

export const addEntity = (items) =>  ({ type: ADD_ENTITY, items });
export const getEntities = (items) => ({ type: GET_ENTITIES, items });

