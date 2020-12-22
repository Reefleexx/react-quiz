import {AUTH_LOGOUT, AUTH_SUCCESS} from "../actions/actionTypes";

const initialState = {
    token: null,
    expiresTime: 0,
    localId: null,
}

export default function authReducer (state = initialState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state,
                token: action.token,
                expiresTime: action.expiresTime,
                localId: action.localId
            }
        case AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                expiresTime: 0,
                localId: null
            }
        default: return state
    }
}