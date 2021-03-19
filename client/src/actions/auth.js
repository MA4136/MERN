import axios from 'axios'
import { setAlert } from './alert'
import { REGISTER_SUCCESS, REGISTER_FAILURE } from './types'

//  User Registration
export const register = ({name, email, password}) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({name, email, password})

    try {
        const res = await axios.post('api/users', body, config)

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
    } catch (e) {
        const errors = e.response.data
        if (errors) {
            errors.map(err => dispatch(setAlert(err, 'danger')))
        }

        dispatch({type: REGISTER_FAILURE})
    }
}