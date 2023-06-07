import { combineReducers } from 'redux';
import userReducer from '../features/userSlice';
import modalReducer from '../features/modalSlice';
import postReducer from '../features/postSlice';
import messageReducer from '../features/messageSlice';
import socketReducer from '../features/socketSlice';
import usersReducer from '../features/usersSlice';
import videoReducer from '../features/videoSlice';
import emailReducer from '../features/emailSlice';

export default combineReducers({
	user: userReducer,
	modal: modalReducer,
	post: postReducer,
	message: messageReducer,
	socket: socketReducer,
	users: usersReducer,
	video: videoReducer,
	email: emailReducer,
});
