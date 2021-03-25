import { combineReducers } from 'redux'
import profile from './profileReducer'
import alert from './alertReducer'
import auth from './authReducer'
import post from './postReducer'

export default combineReducers({alert, auth, profile, post})