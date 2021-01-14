import {takeLatest, put, call} from "@redux-saga/core/effects";
import {FETCH_QUIZ_LIST, FETCH_QUIZ_DELETE} from "../types";
import {fetchQuizStart, fetchQuizSuccess, fetchQuiz} from "../actions/quizList";
import {database} from "../../firebaseConfig";


export default function* quizListWatcher () {
    yield takeLatest(FETCH_QUIZ_LIST, quizListWorker)
    yield takeLatest(FETCH_QUIZ_DELETE, quizDeleteWorker)
}

function* quizDeleteWorker (action) {
    try {
        yield call(() => fetchQuizDelete(action.id))
        yield put(fetchQuiz())
    } catch (e) {
        console.log(e)
    }
}

async function fetchQuizDelete (id) {
    await  database.ref('quizes/' + id).remove()
}

function* quizListWorker () {
    try {
        yield put(fetchQuizStart())
        const quizes = yield call(fetchQuizList)
        yield put(fetchQuizSuccess(quizes))
    } catch (e) {
        console.log(e)
    }
}

async function fetchQuizList () {
    let quizes

    await database.ref('quizes/').once("value", (response) => {
        quizes = response.val()
    })

    return quizes
}