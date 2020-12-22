import axios from 'axios'
import 'firebase/auth';
import {AUTH_LOGOUT, AUTH_SUCCESS} from "./actionTypes";

export function authSuccess (token, expiresTime, localId) {
    return {
        type: AUTH_SUCCESS,
        token, expiresTime, localId
    }
}

export function fetchAuth (authForm, type) {
    return async (dispatch) => {
        try {
            const url = type ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAaI1ywCBFic4yebvBBcQ0JltZJyVPkbms  ':
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAaI1ywCBFic4yebvBBcQ0JltZJyVPkbms'

            const response = await axios.post(url, authForm)
            const data = response.data

            dispatch(authSuccess(data.idToken, data.expiresIn, data.localId))

            localStorage.setItem('token', data.idToken)
            localStorage.setItem('expiresTime', data.expiresIn)
            localStorage.setItem('localId', data.localId)

        } catch (e) {
            console.log(e)
        }
    }
}

export function logOut () {
    return {
        type: AUTH_LOGOUT
    }
}