import axios from 'axios';
import { GET_USER_INFO, UPDATE_USER, POST_ERROR } from './type';
import { setAlert } from './alert';

// Get public user info by user_id
export const getUserInfo = user_id => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${user_id}`);
    dispatch({
      type: GET_USER_INFO,
      payload: res.data, // specific user's info
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

// Add or update bio
export const addOrUpdateBio = (
  { bioText },
  user_id,
  history,
  edit = false
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ bioText });
  try {
    const res = await axios.put('/api/users/bio', body, config);
    dispatch({
      type: UPDATE_USER,
      payload: res.data, // updated user
    });
    if (edit) {
      history.push(`/${user_id}`);
    }
    setAlert(edit ? 'Bio Updated!' : 'Bio Added!', 'success');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 6000)));
    }
  }
};

// Follow a user
export const followUser = followId => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ followId });
  try {
    const res = await axios.put('/api/users/follow', body, config);
    dispatch({
      type: UPDATE_USER,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 6000)));
    }
  }
};
