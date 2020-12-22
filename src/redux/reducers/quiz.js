import {
    ANSWER_RESULT,
    ANSWER_STATE,
    FINISH_QUIZ,
    NEXT_QUESTION,
    QUIZ_START,
    QUIZ_SUCCESS, QUIZ_UNMOUNT,
    RETRY_BUTTON
} from "../actions/actionTypes";

const initialState = {
    loading: true,
    ActiveQuiz: 0,
    AnswerState: null,
    isFinished: false,
    results: [],
    quiz: []
}

export default function quizReducer (state = initialState, action) {
    switch (action.type) {
        case QUIZ_START:
            return {
                ...state,
                loading: true
            }
        case QUIZ_SUCCESS:
            return {
                ...state,
                loading: false,
                quiz: [...action.quiz]
            }
        case ANSWER_STATE:
            return {
                ...state,
                AnswerState: action.answerState
            }
        case NEXT_QUESTION:
            return {
                ...state,
                ActiveQuiz: state.ActiveQuiz + 1,
                AnswerState: null
            }
        case FINISH_QUIZ:
            return {
                ...state,
                isFinished: true
            }
        case ANSWER_RESULT:
            return {
                ...state,
                results: {...state.results, [action.id]: action.b}
            }
        case RETRY_BUTTON:
            return {
               ...state,
                loading: false,
                ActiveQuiz: 0,
                AnswerState: null,
                isFinished: false,
                results: []
            }
        case QUIZ_UNMOUNT: return initialState

        default: return state
    }
}