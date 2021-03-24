import axios from 'axios'
import { setAlert } from './alertActions'
import {
    CLEAR_PROFILE,
    DELETE_ACCOUNT,
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    GET_ALL_PROFILES,
    GET_REPOS
} from './types'

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

//  Get all profiles
export const getProfiles = () => async (dispatch) => {
    dispatch({type: CLEAR_PROFILE})

    try {
        const res = await axios.get('api/profile')

        dispatch({
            type: GET_ALL_PROFILES,
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

//  Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
    try {
        const res = await axios.get(`http://localhost:3000/api/profile/user/${userId}`)
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

//  Get Github repos
export const getGitRepos = (userName) => async (dispatch) => {
    try {
        const res = await axios.get(`http://localhost:3000/api/profile/github/${userName}`)
        dispatch({
            type: GET_REPOS,
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

        const alertMsg = edit ? 'profile Updated' : 'profile Created'
        dispatch(setAlert(alertMsg, 'success'))

        if (!edit) {
            history.push('/dashboard')
        }

    } catch (e) {
        const errors = e.response.data
        if (errors) errors.map(err => dispatch(setAlert(err, 'danger')))

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

        dispatch(setAlert('Experience added', 'success'))
        history.push('/dashboard')

    } catch (e) {
        const errors = e.response.data
        if (errors) errors.map(err => dispatch(setAlert(err, 'danger')))

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

        dispatch(setAlert('Education added', 'success'))
        history.push('/dashboard')

    } catch (e) {
        const errors = e.response.data
        if (errors) errors.map(err => dispatch(setAlert(err, 'danger')))

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: e.response.statusText, status: e.response.status
            }
        })
    }
}

//  Delete experience
export const deleteExperience = (id) => async (dispatch) => {
    try {
        const res = await axios.delete(`api/profile/experience/${id}`)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Experience deleted', 'success'))

    } catch (e) {
        const errors = e.response.data
        if (errors) errors.map(err => dispatch(setAlert(err, 'danger')))

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: e.response.statusText, status: e.response.status
            }
        })
    }
}

//  Delete education
export const deleteEducation = (id) => async (dispatch) => {
    try {
        const res = await axios.delete(`api/profile/education/${id}`)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Education deleted', 'success'))

    } catch (e) {
        const errors = e.response.data
        if (errors) errors.map(err => dispatch(setAlert(err, 'danger')))

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: e.response.statusText, status: e.response.status
            }
        })
    }
}

//  Delete account & profile
export const deleteAccount = () => async (dispatch) => {
    if (window.confirm('This action cannot be undone. Confirm?')) {
        try {
            await axios.delete('api/profile')
            dispatch({type: CLEAR_PROFILE})
            dispatch({
                type: DELETE_ACCOUNT
            })
            dispatch(setAlert('Great!', 'success'))

        } catch (e) {
            const errors = e.response.data
            if (errors) errors.map(err => dispatch(setAlert(err, 'danger')))

            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: e.response.statusText, status: e.response.status
                }
            })
        }
    }
}