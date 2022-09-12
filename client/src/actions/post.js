import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    PROFILE_ERROR,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
} from './types';
import axios from 'axios';
import { setAlert } from './alert';

// Get posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts');
        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
}

// Like post/add like
export const addLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${id}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Unlike post/ remove like
export const removeLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${id}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Delete post
export const deletePost = id => async dispatch => {
    try {
        await axios.delete(`/api/posts/${id}`);
        dispatch({
            type: DELETE_POST,
            payload: id
        });
        dispatch(setAlert('Post removed','success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
}

// Add post
export const addPost = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify(formData)

    try {
        const res = await axios.post('/api/posts', body, config);

        dispatch({
            type: ADD_POST,
            payload: res.data
        });

        dispatch(setAlert('Post created','success'));

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
}

// Get Post
export const getPost = id => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${id}`);
        dispatch({
            type: GET_POST,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
}

// Add comment
export const addComment = ( postId, formData ) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const res = await axios.post(`/api/posts/comments/${postId}`, formData, config);
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });
        dispatch(setAlert('Comment Added','success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
}

// Delete/Remove comment
export const removeComment = (postId, commentId) => async dispatch => {
    try {
        await axios.delete(`/api/posts/comments/${postId}/${commentId}`);
        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        });
        dispatch(setAlert('Comment deleted','success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        }); 
    }
}