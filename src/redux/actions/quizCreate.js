import {ADD_QUIZ_ITEM, QUIZ_DELETE} from './actionTypes'
import axios from "axios";

export function onAddQuiz (quiz) {
    return {
        type: ADD_QUIZ_ITEM,
        payload: quiz
    }
}

export function quizDelete () {
    return {
        type: QUIZ_DELETE
    }
}

export function onSubmitQuiz () {
    return async (dispatch, getState) => {
        try {
            const data = getState().create.quizes
            await axios.post('https://react-quiz-fb6f1.firebaseio.com/quizes.json', data)
            dispatch(quizDelete())
        } catch (e) {
            console.log(e)
        }
    }
}