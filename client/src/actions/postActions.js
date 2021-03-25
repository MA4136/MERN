import axios from 'axios'
import { setAlert } from './alertActions'
import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST } from './types'

//  Get all posts
export const getPosts = () => async (dispatch) => {
    try {
        const res = await axios.get('api/posts/')
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: e.response.statusText, status: e.response.status
            }
        })
    }
}

//  Like a post
export const addLike = (postId) => async (dispatch) => {
    try {
        const res = await axios.put(`api/posts/like/${postId}`)
        dispatch({
            type: UPDATE_LIKES,
            payload: {postId, likes: res.data}
        })
    } catch (e) {
        dispatch(setAlert('You already did it', 'danger'))
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: e.response.statusText, status: e.response.status
            }
        })
    }
}

//  Unlike a post
export const removeLike = (postId) => async (dispatch) => {
    try {
        const res = await axios.put(`api/posts/unlike/${postId}`)
        dispatch({
            type: UPDATE_LIKES,
            payload: {postId, likes: res.data}
        })
    } catch (e) {
        dispatch(setAlert('One once for each', 'danger'))
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: e.response.statusText, status: e.response.status
            }
        })
    }
}

//  Delete a post
export const deletePost = (postId) => async (dispatch) => {
    try {
        await axios.delete(`api/posts/${postId}`)
        dispatch({
            type: DELETE_POST,
            payload: postId
        })
        dispatch(setAlert('Deleted', 'success'))
    } catch (e) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: e.response.statusText, status: e.response.status
            }
        })
    }
}