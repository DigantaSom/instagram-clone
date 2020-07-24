import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POSTS,
  POST_ERROR,
  CLEAR_POSTS,
  CREATE_POST,
  GET_POSTS_OF_USER,
  CLEAR_USER_POSTS,
  GET_POST,
  DELETE_POST,
  UPDATE_LIKE_ON_POST,
} from './type';

// Get all posts of all users
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/posts/all');
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

//  Get all posts of me (logged in user) and all the users I'm (logged in user) following
export const getPostsOfMeAndWhomImFollowing = () => async dispatch => {
  try {
    const res = await axios.get('/api/posts');
    dispatch({
      type: GET_POSTS,
      payload: res.data, // posts
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

export const getPostByPostId = post_id => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${post_id}`);
    dispatch({
      type: GET_POST,
      payload: res.data, // the post by it's post_id
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
    dispatch(setAlert('Post Added!', 'success'));
    history.push('/');
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

// Delete a post
export const deletePost = post_id => async dispatch => {
  if (window.confirm('Are you sure you want to delete this post?')) {
    try {
      await axios.delete(`/api/posts/p/${post_id}`);
      dispatch({
        type: DELETE_POST,
        payload: post_id,
      });
      dispatch(setAlert('Post deleted', 'success'));
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  }
};

// Like a post
export const likePost = post_id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/p/like/${post_id}`);
    dispatch({
      type: UPDATE_LIKE_ON_POST,
      payload: {
        post_id,
        likes: res.data,
      },
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

// Unlike a post
export const unlikePost = post_id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/p/unlike/${post_id}`);
    dispatch({
      type: UPDATE_LIKE_ON_POST,
      payload: {
        post_id,
        likes: res.data,
      },
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
