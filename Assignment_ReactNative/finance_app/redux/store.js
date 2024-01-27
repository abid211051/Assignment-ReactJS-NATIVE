import { configureStore } from '@reduxjs/toolkit';
import incExpReducer from './Slices/IncExpSlice';
import accountReducer from './Slices/AccountSlice';
import categoryReducer from './Slices/CategorySlice';

const store = configureStore({
    reducer: {
        incExp: incExpReducer,
        account: accountReducer,
        category: categoryReducer
    }
});

export default store;