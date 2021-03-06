import axios from 'axios'
import { setAlert } from './alertActions'
import {
    GET_POSTS,
    GET_POST,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    ADD_COMMENT,
    DELETE_COMMENT
} from './types'

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

//  Get post
export const getPost = (postId) => async (dispatch) => {
    try {
        const res = await axios.get(`http://localhost:3000/api/posts/${postId}`)
        dispatch({
            type: GET_POST,
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

//  Add a post
export const addPost = (text) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify(text)

    try {
        const res = await axios.post('api/posts/', body, config)
        dispatch({
            type: ADD_POST,
            payload: res.data
        })
        dispatch(setAlert('Post created!', 'success'))

    } catch (e) {
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

//  Add a comment
export const addComment = (postId, text) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify(text)

    try {
        const res = await axios.post(`http://localhost:3000/api/posts/comment/${postId}`, body, config)
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        })
        dispatch(setAlert('Comment added', 'success'))
        dispatch(getPost(postId))

    } catch (e) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: e.response.statusText, status: e.response.status
            }
        })
    }
}

//  Delete a comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
    try {
        await axios.delete(`http://localhost:3000/api/posts/comment/${postId}/${commentId}`)
        dispatch({
            type: DELETE_COMMENT,
            payload: commentId
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