import {FETCH_QUIZ_START, FETCH_QUIZ_SUCCESS} from "../types";

const initialState = {
    quizes: [],
    loading: false
}

export default function quizListReducer (state = initialState, action) {
    switch (action.type) {
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state,
                quizes: [...action.quizList],
                loading: false
            }
        case FETCH_QUIZ_START:
            return {
                ...state,
                loading: true
            }
        default: return state
    }
}