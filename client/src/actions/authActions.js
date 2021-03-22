import axios from 'axios'
import { setAlert } from './alertActions'
import {
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    CLEAR_PROFILE,
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT
} from './types'
import setAuthToken from '../utils/setAuthToken'

//  Load User
export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('/api/auth')
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })

    } catch (e) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

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
        dispatch(loadUser())

    } catch (e) {
        const errors = e.response.data
        if (errors) {
            errors.map(err => dispatch(setAlert(err, 'danger')))
        }
        dispatch({type: REGISTER_FAILURE})
    }
}

//  LogIn User
export const logIn = (email, password) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({email, password})

    try {
        const res = await axios.post('api/auth', body, config)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())

    } catch (e) {
        const errors = e.response.data
        if (errors) {
            errors.map(err => dispatch(setAlert(err, 'danger')))
        }
        dispatch({type: LOGIN_FAILURE})
    }
}

//  LogOut User
export const logOut = () => (dispatch) => {
    dispatch({type: CLEAR_PROFILE})
    dispatch({type: LOGOUT})
}