import {all} from 'redux-saga/effects'
import authWatcher from "./authSaga";
import quizListWatcher from "./quizListSaga";
import quizWatcher from "./quizSaga";
import createSagaWatcher from "./createSaga";

function* rootSaga() {
    yield all([
        authWatcher(),
        quizListWatcher(),
        quizWatcher(),
        createSagaWatcher()
    ])
}

export default rootSaga