import {
    TOGGLE_SIDE, QUIZ_SUBMIT, QUIZ_STATUS,
    QUIZ_START, QUIZ_CREATE, QUIZ_LIST
} from '../_actions/types';

const initialState = {
    showSidebar: false,
    answerCorrect: false,
    quizForbidden: false
};

export default function user (state = initialState, action) {
    switch (action.type){
        case TOGGLE_SIDE:
            if(state.id !== action.id){
                return state;
            }else{
                return {...state, showSidebar: !state.showSidebar};
            }
        case QUIZ_SUBMIT:
            return {...state, answerCorrect: action.payload.message};
        case QUIZ_STATUS:
            return {...state, quizForbidden: action.payload.code};
        case QUIZ_START:
            return {...state};
        case QUIZ_CREATE:
            return {...state};
        case QUIZ_LIST:
            return {...state};
        default:
            return state;
    }
}