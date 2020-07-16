import { UPDATE_USER, GET_USER_INFO } from '../actions/type';

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USER_INFO:
    case UPDATE_USER:
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
};
