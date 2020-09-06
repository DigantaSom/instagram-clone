import {
  GET_POSTS,
  CLEAR_POSTS,
  CREATE_POST,
  GET_POSTS_OF_USER,
  CLEAR_USER_POSTS,
  GET_POST,
  DELETE_POST,
  UPDATE_LIKE_ON_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  UPDATE_LIKE_ON_COMMENT,
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
        post: { ...state.post, likes: payload.likes },
        loading: false,
      };

    case ADD_COMMENT:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.post_id ? { ...post, comments: payload.comments } : post
        ),
        post: { ...state.post, comments: payload.comments },
        loading: false,
      };

    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(com => com._id !== payload.comment_id),
        },
        loading: false,
      };

    case UPDATE_LIKE_ON_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.map(comment =>
            comment._id === payload.comment_id
              ? { ...comment, comment_likes: payload.comment_likes }
              : comment
          ),
        },
        loading: false,
      };

    default:
      return state;
  }
};
