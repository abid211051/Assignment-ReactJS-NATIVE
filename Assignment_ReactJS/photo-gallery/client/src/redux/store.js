import {configureStore} from '@reduxjs/toolkit';
import ImageReducer from './features/imageSlice';
import UserReducer from './features/userSlice';
import FeedBackReducer from './features/feedbackSlice';
import AuthReducer from './features/authSlice';
const store = configureStore({
    reducer :{
        image : ImageReducer,
        users : UserReducer,
        feedback: FeedBackReducer,
        auth : AuthReducer
    }
})
export default store;