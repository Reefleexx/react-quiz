import axios from 'axios'
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
            const response = await axios.get(`https://react-quiz-fb6f1.firebaseio.com/quizes/${id}.json`)
            const data = response.data

            dispatch(fetchQuizSuccess(data))

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

function answerResult(id, boolean) {
    return {
        type: ANSWER_RESULT,
        id, boolean
    }
}

export function onAnswerClick(id) {
    return (dispatch, getState) => {
        const quiz = getState().quiz
        const activeQuiz = quiz.ActiveQuiz

        if(quiz.quiz[activeQuiz].rightAnswer === id){

            if (!quiz.results[activeQuiz]){
                dispatch(answerState({[id]: "success"}))
                dispatch(answerResult(id, true))
            }

            if(quiz.quiz.length >= activeQuiz + 2) {
                dispatch(nextQuestion())
            } else {
                dispatch(finishQuiz())
            }

        } else {
                dispatch(answerState({[id]: "error"}))
                dispatch(answerResult(id, false))
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