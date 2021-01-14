import {FETCH_QUIZ_LIST, FETCH_QUIZ_DELETE, FETCH_QUIZ_START, FETCH_QUIZ_SUCCESS} from "../types";

export function fetchQuizStart () {
    return {
        type: FETCH_QUIZ_START
    }
}

export function fetchQuizSuccess (quizes) {

    let quizList = []

    if (quizes) {
        Object.keys(quizes).forEach((quiz, index) => {
            quizList.push({
                id: quiz,
                title: quizes[quiz].title
            })
        })
    }

    return {
        type: FETCH_QUIZ_SUCCESS,
        quizList
    }
}

export function fetchDeleteQuiz(id) {
    return {
        type: FETCH_QUIZ_DELETE,
        id
    }
}

export function fetchQuiz () {
    return {
        type: FETCH_QUIZ_LIST
    }
}