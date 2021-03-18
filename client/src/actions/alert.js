import { v4 } from 'uuid'
import { SET_ALERT } from './types'

export const setAlert = (msg, alertType) => (dispatch) => {
    const id = v4()
    return dispatch({
        type: SET_ALERT,
        payload: {msg, alertType, id}
    })
}