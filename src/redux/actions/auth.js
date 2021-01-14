import 'firebase/auth';
import {AUTH_LOGOUT, AUTH_SUCCESS, FETCH_AUTH} from "../types";

export function authSuccess (token, expiresIn, localId) {

    localStorage.setItem('token', token)
    localStorage.setItem('expiresIn', expiresIn)
    localStorage.setItem('localId', localId)

    return {
        type: AUTH_SUCCESS,
        token, expiresIn, localId
    }
}

export function fetchAuth (authForm, authType) {
    return {
        type: FETCH_AUTH,
        authForm, authType
    }
}

export function checkStorage () {
    return (dispatch) => {
        const token = localStorage.getItem('token')
        const time = localStorage.getItem('expiresIn')
        const id = localStorage.getItem('localId')

        if (token) {
            if (time >= new Date().getTime()) {
                dispatch(authSuccess(token, time, id))
            } else {
               dispatch(logOut())
            }
        }
    }
}

export function autoLogOut (time) {
    return async (dispatch) => {
        setTimeout(() => {
            dispatch(logOut())
        }, time)
    }
}

export function logOut () {
    localStorage.removeItem('localId')
    localStorage.removeItem('expiresTime')
    localStorage.removeItem('token')

    return {
        type: AUTH_LOGOUT
    }
}