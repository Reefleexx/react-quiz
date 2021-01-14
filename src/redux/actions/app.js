import {SHOW_ALERT, HIDE_ALERT} from "../types";

function startAlert (error) {
    return {
        type: SHOW_ALERT,
        error
    }
}

let timer1

export function showAlert (error) {
    return async (dispatch) => {
        dispatch(startAlert(error))
        timer1 = setTimeout(() => {
            dispatch(hideAlert())
        }, 7000)
    }
}

export function hideAlert () {
    clearTimeout(timer1)
    return {
        type: HIDE_ALERT
    }
}