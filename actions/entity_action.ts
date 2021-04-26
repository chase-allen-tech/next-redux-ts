import {
    ADD_ENTITY, GET_ENTITIES,
} from '../constants/actionTypes';
import { M_ADD_ENTITY } from '../constants/gqlQueries';
import { useMutation } from '@apollo/client';

export const addEntity = (item) => async dispatch => {

    console.log("addEntity-action");
    // const [add_entity] = useMutation(Q_ADD_ENTITY);
    // let result = await add_entity({
    //     variables: {
    //         "name": "Third Entity",
    //         "identification": "003",
    //         "project": "First Project",
    //         "legal": "authority",
    //         "phone": "8018881224",
    //         "address1": "1 street, France",
    //         "address2": "2 street, France",
    //         "city": "Paris",
    //         "zip": "4242",
    //         "country": "France",
    //         "members": ["002", "003"]
    //     }
    // });

    console.log(item);


    dispatch({ type: ADD_ENTITY, item });
}
export const getEntities = (item) => ({ type: ADD_ENTITY, item });

