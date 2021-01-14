import {AUTH_LOGOUT, AUTH_SUCCESS} from "../types";

const initialState = {
    token: null,
    expiresIn: 0,
    localId: null,
    error: null
}

export default function authReducer (state = initialState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state,
                token: action.token,
                expiresIn: action.expiresIn,
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