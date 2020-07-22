import { UPDATE_USER, GET_USER_INFO, FOLLOW, UNFOLLOW } from '../actions/type';

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USER_INFO:
    case UPDATE_USER:
      return {
        ...state,
        ...payload,
      };

    case FOLLOW:
    case UNFOLLOW:
      return {
        ...state,
        followers: payload,
      };

    default:
      return state;
  }
};
