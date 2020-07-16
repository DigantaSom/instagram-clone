import {
    GET_POSTS,
    CLEAR_POSTS,
    CREATE_POST,
    GET_POSTS_OF_USER,
    CLEAR_USER_POSTS,
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

        default:
            return state;
    }
};
