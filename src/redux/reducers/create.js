import {ADD_QUIZ_ITEM, QUIZ_DELETE} from "../types";

const initialState = {
    quizes: []
}

export default function quizCreateReducer (state = initialState, action) {
    switch (action.type) {
        case ADD_QUIZ_ITEM:
            return {
                ...state,
                quizes: [...state.quizes, action.payload]
            }
        case QUIZ_DELETE:
            return {
                ...state,
                quizes: []
            }
        default: return state
    }
}