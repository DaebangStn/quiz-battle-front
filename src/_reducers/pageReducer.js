import {
    TOGGLE_SIDE, QUIZ_SUBMIT, QUIZ_STATUS,
    QUIZ_START, QUIZ_CREATE, QUIZ_LIST
} from '../_actions/types';

const initialState = {
    showSidebar: false,
    message: "",
    quizForbidden: false,
    areYouHost: false
};

export const PAGE_MESSAGE_START_ACCEPTED = "quiz room is now started, going next round";
export const PAGE_MESSAGE_ANSWER_CORRECT = "answer is correct, going next round";

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
            return {...state, quizForbidden: action.payload.code};
        case QUIZ_START:
            return {...state, message: action.payload.message};
        case QUIZ_CREATE:
            return {...state};
        case QUIZ_LIST:
            return {...state};
        default:
            return state;
    }
}