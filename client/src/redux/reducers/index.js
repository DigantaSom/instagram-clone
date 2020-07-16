import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import user from './user';
import post from './post';

export default combineReducers({
    alert,
    auth,
    user,
    post,
});
