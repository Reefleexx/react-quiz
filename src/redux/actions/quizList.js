import {FETCH_QUIZ_START, FETCH_QUIZ_SUCCESS} from "./actionTypes";
import {database} from "../../firebaseConfig";

function fetchQuizStart () {
    return {
        type: FETCH_QUIZ_START
    }
}

function fetchQuizSuccess (quizList) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quizList
    }
}

export function fetchDeleteQuiz(id) {
    return async (dispatch) => {
        try {
            await  database.ref('quizes/' + id).remove()
            dispatch(fetchQuiz())
        } catch (e) {
            console.log(e)
        }
    }
}

export function fetchQuiz () {
    return async (dispatch) => {
        try {
            dispatch(fetchQuizStart())

            let quizes

            await database.ref('quizes/').once("value", (response) => {
                quizes = response.val()
            })

            let quizList = []

            if (quizes) {
                Object.keys(quizes).forEach((quiz, index) => {
                    quizList.push({
                        id: quiz,
                        title: quizes[quiz].title
                    })
                })
            }

            dispatch(fetchQuizSuccess(quizList))

        } catch (e) {
            console.log(e)
        }
    }
}