import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_POSTS,
    POST_ERROR,
    CLEAR_POSTS,
    CREATE_POST,
    GET_POSTS_OF_USER,
    CLEAR_USER_POSTS,
} from './type';

// Get all posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts');
        dispatch({
            type: GET_POSTS,
            payload: res.data, // all posts
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

// Create a post
export const createPost = (formData, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            // 'Content-Type': 'application/json',
        },
    };
    try {
        const res = await axios.post('/api/posts', formData, config);
        dispatch({
            type: CREATE_POST,
            payload: res.data, // added post
        });
        history.push('/');
        dispatch(setAlert('Post Added!', 'success'));
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 6000)));
        }
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

// Get all posts of a user by user_id
export const getPostsOfUser = user_id => async dispatch => {
    dispatch({ type: CLEAR_POSTS }); // to remove all posts from all users from state
    try {
        const res = await axios.get(`/api/posts/${user_id}`);
        dispatch({
            type: GET_POSTS_OF_USER,
            payload: res.data, // all posts of specific user
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

// Clear posts of all users
export const clearPosts = () => dispatch => {
    dispatch({ type: CLEAR_POSTS });
};

// Clear posts of one user
export const clearUserPosts = () => dispatch => {
    // to clear a specific user's posts from state, after visiting their profile and coming to homepage.
    dispatch({ type: CLEAR_USER_POSTS });
};
