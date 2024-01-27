import { configureStore } from '@reduxjs/toolkit';
import DataReducer from '../Slices/getdata/getDataSlice';
import UserReducer from '../Slices/auth/userSlice';
import AuthReducer from '../Slices/auth/authSlice';
import BookingReducer from '../Slices/getdata/bookingSlice';
const store = configureStore({
    reducer: {
        alldata: DataReducer,
        user: UserReducer,
        auth: AuthReducer,
        booking : BookingReducer
    }
})
export default store;