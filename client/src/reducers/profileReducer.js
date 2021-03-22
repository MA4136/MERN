import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, UPDATE_PROFILE } from '../actions/types'

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    isLoading: true,
    error: {}
}

export default function (state = initialState, action) {
    const {type, payload} = action

    switch (type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                isLoading: false
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                isLoading: false
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                repos: [],
                isLoading: false,
            }
        default:
            return state
    }
}
