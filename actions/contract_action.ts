import {
    ADD_CONTRACT, GET_CONTRACTS,
} from '../constants/actionTypes';


export const getContracts = (item) => ({ type: GET_CONTRACTS, item });
export const addContract = (item) => ({ type: ADD_CONTRACT, item });
