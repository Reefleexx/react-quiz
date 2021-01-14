import {ADD_QUIZ_ITEM, FETCH_CREATE, QUIZ_DELETE} from '../types'

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

export function onSubmitQuiz (title, quizes) {

    return {
        type: FETCH_CREATE,
        quiz: {
            title, questions: quizes
        }
    }
    // return async (dispatch, getState) => {
    //     try {
    //         const data = {
    //             title,
    //             questions: getState().create.quizes
    //         }
    //         await database.ref('quizes/').push().set(data)
    //
    //         dispatch(quizDelete())
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }
}