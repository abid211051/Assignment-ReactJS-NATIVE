import {configureStore} from '@reduxjs/toolkit';
import bookReducer from './Slices/BookSlice';
import reviewReducer from './Slices/ReviewSlice';
const store = configureStore({
    reducer:{
        books:bookReducer,
        review:reviewReducer,
    }
})

export default store;