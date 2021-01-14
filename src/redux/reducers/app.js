import {
    HIDE_ALERT,
    SHOW_ALERT
} from "../types";

const initialState = {
    error: null
}

export default function appReducer (state = initialState, action) {
    switch (action.type) {
        case SHOW_ALERT:
            return {
                ...state,
                error: action.error
            }
        case HIDE_ALERT:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}