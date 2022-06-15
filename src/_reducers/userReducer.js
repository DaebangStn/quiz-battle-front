import {
    REGISTER_USER, LOGIN_USER, GET_PROFILE,
    GET_LIST, GET_PASSWORD_TOKEN, CONFIRM_PASSWORD
} from "../_actions/types"

export const USER_MESSAGE_FAILED = "Request failed with status code 400";
export const USER_MESSAGE_NOT_FOUND = "Request failed with status code 404";

export default function user (state = {}, action){
    switch (action.type){
        case REGISTER_USER:
            return{...state, success: action.payload};
        case LOGIN_USER:
            return{...state, message: action.payload.message};
        case GET_PROFILE:
            return{...state, success: action.payload};
        case GET_LIST:
            return{...state, success: action.payload};
        case GET_PASSWORD_TOKEN:
            return{...state, message: action.payload.message};
        case CONFIRM_PASSWORD:
            return{...state, message: action.payload.message};
        default:
            return state;
    }
}