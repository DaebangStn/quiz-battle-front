import {
    REGISTER_USER, LOGIN_USER, GET_PROFILE, GET_LIST
} from "../_actions/types"

export default function user (state = {}, action){
    switch (action.type){
        case REGISTER_USER:
            return{...state, success: action.payload};
        case LOGIN_USER:
            return{...state, success: action.payload};
        case GET_PROFILE:
            return{...state, success: action.payload};
        case GET_LIST:
            return{...state, success: action.payload};
        default:
            return state;
    }
}