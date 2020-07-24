import {
  GET_POSTS,
  CLEAR_POSTS,
  CREATE_POST,
  GET_POSTS_OF_USER,
  CLEAR_USER_POSTS,
  GET_POST,
  DELETE_POST,
  UPDATE_LIKE_ON_POST,
} from '../actions/type';

const initialState = {
  posts: [],
  userPosts: [],
  post: null,
  loading: true,
  error: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };

    case GET_POSTS_OF_USER:
      return {
        ...state,
        // posts: [],
        userPosts: payload,
        loading: false,
      };

    case CREATE_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };

    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };

    case CLEAR_POSTS:
      return {
        ...state,
        posts: [],
        post: null,
        loading: true,
        // error: {}
      };

    case CLEAR_USER_POSTS:
      return {
        ...state,
        userPosts: [],
        post: null,
        loading: true,
        // error: {}
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(p => p._id !== payload),
        loading: false,
      };

    case UPDATE_LIKE_ON_POST:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.post_id ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };

    default:
      return state;
  }
};
