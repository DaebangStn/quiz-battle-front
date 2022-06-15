import {
    TOGGLE_SIDE, QUIZ_SUBMIT, QUIZ_STATUS,
    QUIZ_START, QUIZ_CREATE, QUIZ_LIST, QUIZ_UPDATE, QUIZ_DELETE
} from '../_actions/types';

const initialState = {
    showSidebar: false,
    message: "",
};

export const PAGE_MESSAGE_START_ACCEPTED = "quiz room is now started, going next round";
export const PAGE_MESSAGE_ANSWER_CORRECT = "answer is correct, going next round";
export const PAGE_MESSAGE_FORBIDDEN = "Request failed with status code 403";
export const PAGE_MESSAGE_NOT_FOUND = "Request failed with status code 404";

export default function user (state = initialState, action) {
    switch (action.type){
        case TOGGLE_SIDE:
            if(state.id !== action.id){
                return state;
            }else{
                return {...state, showSidebar: !state.showSidebar};
            }
        case QUIZ_SUBMIT:
            return {...state, message: action.payload.message};
        case QUIZ_STATUS:
            return {...state, message: action.payload.message};
        case QUIZ_START:
            return {...state, message: action.payload.message};
        case QUIZ_CREATE:
            return {...state};
        case QUIZ_LIST:
            return {...state};
        case QUIZ_UPDATE:
            return {...state, message: action.payload.message};
        case QUIZ_DELETE:
            return {...state, message: action.payload.message};
        default:
            return state;
    }
}