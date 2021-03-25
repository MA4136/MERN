import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST } from '../actions/types'

const initState = {
    post: null,
    posts: [],
    isLoading: true,
    errors: {}
}

export default function post(state = initState, action) {
    const {type, payload} = action

    switch (type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                isLoading: false
            }
        case POST_ERROR:
            return {
                ...state,
                error: payload,
                isLoading: false
            }
        case UPDATE_LIKES:
            return {
                ...state,
                posts: state.posts.map(el => el._id === payload.postId ? {...el, likes: payload.likes} : el),
                isLoading: false
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(el => el._id !== payload),
                isLoading: false
            }
        default:
            return state
    }
}