import {database} from "../../firebaseConfig";
import {
    QUIZ_START,
    QUIZ_SUCCESS,
    ANSWER_STATE,
    NEXT_QUESTION,
    FINISH_QUIZ,
    ANSWER_RESULT,
    RETRY_BUTTON,
    QUIZ_UNMOUNT
} from "./actionTypes";

export function fetchQuizSuccess (quiz) {
    return {
        type: QUIZ_SUCCESS,
        quiz
    }
}

export function fetchQuizStart () {
    return {
        type: QUIZ_START
    }
}

export function fetchQuiz (id) {
    return async (dispatch) => {
        try {
            dispatch(fetchQuizStart())
            let data
            await database.ref('quizes/' + id).once('value', (snapshot) => data = snapshot.val())

            dispatch(fetchQuizSuccess(data.questions))

        } catch (e) {
            console.log(e)
        }
    }
}

function answerState (answerState) {
    return {
        type: ANSWER_STATE,
        answerState
    }
}

function nextQuestion() {
    return {
        type: NEXT_QUESTION
    }
}

function finishQuiz() {
    return {
        type: FINISH_QUIZ
    }
}

function answerResult(id, b) {
    return {
        type: ANSWER_RESULT,
        id, b
    }
}

export function onAnswerClick(id) {
    return (dispatch, getState) => {
        const quiz = getState().quiz
        const activeQuiz = quiz.ActiveQuiz

        if(quiz.quiz[activeQuiz].rightAnswer === id){

            dispatch(answerState({[id]: "success"}))


            if (!quiz.results[activeQuiz]){
                dispatch(answerResult(activeQuiz, "success"))
            }

            if(quiz.quiz.length >= activeQuiz + 2) {
                dispatch(nextQuestion())
            } else {
                dispatch(finishQuiz())
            }

        } else {
                dispatch(answerState({[id]: "error"}))
                dispatch(answerResult(activeQuiz, "error"))
            }
        }
}

export function retryButton () {
    return {
        type: RETRY_BUTTON
    }
}

export function unMount () {
    return {
        type: QUIZ_UNMOUNT
    }
}