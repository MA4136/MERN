import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from './types'
import { setAlert } from './alertActions'
import axios from 'axios'

//  Get current user profile
export const getCurrentProfile = () => async (dispatch) => {
    try {
        const res = await axios.get('api/profile/me')

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

    } catch (e) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: e.response.statusText, status: e.response.status
            }
        })
    }
}

//  Create/update profile
export const createProfile = (formData, history, edit = false) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify(formData)

        const res = await axios.post('api/profile', body, config)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

        const alertMsg = edit ? 'Profile Updated' : 'Profile Created'
        dispatch(setAlert(alertMsg, 'success', 5000))

        if (!edit) {
            history.push('/dashboard')
        }

    } catch (e) {
        const errors = e.response.data
        if (errors) {
            errors.map(err => dispatch(setAlert(err, 'danger')))
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: e.response.statusText, status: e.response.status
            }
        })
    }
}

//  Add experience
export const addExperience = (formData, history) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify(formData)

        const res = await axios.put('api/profile/experience', body, config)
        dispatch({
            type: UPDATE_PROFILE, // or GET_PROFILE
            payload: res.data
        })

        dispatch(setAlert('Experience added', 'success', 5000))
        history.push('/dashboard')

    } catch (e) {
        const errors = e.response.data
        if (errors) {
            errors.map(err => dispatch(setAlert(err, 'danger')))
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: e.response.statusText, status: e.response.status
            }
        })
    }
}

//  Add education
export const addEducation = (formData, history) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify(formData)

        const res = await axios.put('api/profile/education', body, config)
        dispatch({
            type: UPDATE_PROFILE, // or GET_PROFILE
            payload: res.data
        })

        dispatch(setAlert('Education added', 'success', 5000))
        history.push('/dashboard')

    } catch (e) {
        const errors = e.response.data
        if (errors) {
            errors.map(err => dispatch(setAlert(err, 'danger')))
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: e.response.statusText, status: e.response.status
            }
        })
    }
}