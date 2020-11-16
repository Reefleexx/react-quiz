import axios from "axios";
import {FETCH_QUIZ_START, FETCH_QUIZ_SUCCESS} from "./actionTypes";

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

export function fetchQuiz () {
    return async (dispatch) => {
        try{
            dispatch(fetchQuizStart())

            const response = await axios.get(`https://react-quiz-fb6f1.firebaseio.com/quizes.json`)
            const data = response.data

            let quizList = []
            console.log(data)
            if (data) {
                Object.keys(data).forEach((quiz, index) => {
                    quizList.push({
                        path: quiz,
                        id: index + 1
                    })
                })
            }

            console.log(quizList)
            dispatch(fetchQuizSuccess(quizList))

        } catch (e) {
            console.log(e)
        }
    }
}