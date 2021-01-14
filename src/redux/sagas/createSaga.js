import {takeLeading, put, call} from "@redux-saga/core/effects";
import {database} from "../../firebaseConfig";
import {quizDelete} from "../actions/quizCreate";
import {FETCH_CREATE} from "../types";

export default function* createSagaWatcher () {
    yield takeLeading(FETCH_CREATE, action => createWorker(action.quiz))
}

function* createWorker (quiz) {
    try {
        yield call(() => fetchCreate(quiz))
        yield put(quizDelete())
    } catch (e) {
        console.log(e)
    }
}

async function fetchCreate (quiz) {
    await database.ref('quizes/').push().set(quiz)
}