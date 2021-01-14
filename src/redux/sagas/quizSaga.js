import {takeLeading, put, call} from "@redux-saga/core/effects";
import {FETCH_QUIZ} from "../types";
import {fetchQuizStart, fetchQuizSuccess} from "../actions/quiz";
import {database} from "../../firebaseConfig";

export default function* quizWatcher () {
    yield takeLeading(FETCH_QUIZ, (action) => quizWorker(action.id))
}

function* quizWorker (id) {
    try {
        yield put(fetchQuizStart())
        const payload = yield call(() => fetchQuiz(id))
        yield put(fetchQuizSuccess(payload.questions))
    } catch (e) {
        console.log(e)
    }
}

async function fetchQuiz (id) {
    let data
    await database.ref('quizes/' + id).once('value', (snapshot) => data = snapshot.val())

    return data
}