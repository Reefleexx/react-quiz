import {put, call, select, takeLeading} from "@redux-saga/core/effects";
import {AUTH_SUCCESS, FETCH_AUTH} from "../types";
import axios from "axios";
import {authSuccess, autoLogOut} from "../actions/auth";
import {showAlert} from "../actions/app";

export default function* authWatcher () {
    yield takeLeading(FETCH_AUTH, (action) => authWorker(action))
    yield takeLeading(AUTH_SUCCESS, autoLogoutWorker)
}

function* autoLogoutWorker(action) {
    yield put(autoLogOut(action.expiresIn - new Date().getTime()))
}

//           action@gmail.com
function* authWorker (action) {
    try {
        const payload = yield call(() => fetchAuth(action.authType, action.authForm))
        yield put(authSuccess(payload.idToken, payload.expiresIn * 1000 + new Date().getTime(), payload.localId))
    } catch (e) {
        const error = yield select(state => state.app.error)
        if (!error) {
            yield put(showAlert('Invalid password or email'))
        }
    }
}

async function fetchAuth (type, authForm) {
    const url = type ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAaI1ywCBFic4yebvBBcQ0JltZJyVPkbms  ':
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAaI1ywCBFic4yebvBBcQ0JltZJyVPkbms'

    const response = await axios.post(url, authForm)
    return response.data
}