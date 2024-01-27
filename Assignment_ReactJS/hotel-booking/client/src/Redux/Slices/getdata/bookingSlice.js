import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios'

const initialState = {
    loading:false,
    bookings : [],
    error :null
}

export const bookingData = createAsyncThunk('booking/bookingData', async()=>{
    try {
        const response = await axios.get('http://localhost:3001/bookings');
        return response.data;
    } catch (error) {
        throw Error(error.message);
    }
})
export const postbooking = createAsyncThunk('booking/postbooking', async(data)=>{
    try {
        const response = await axios.post('http://localhost:3001/bookings', data);
        // console.log(response.data)
        return response.data;
    } catch (error) {
        throw Error(error.message);
    }
})

const bookingDataSlice = createSlice({
    name:'booking',
    initialState:initialState,
    extraReducers: (builder)=>{
        builder.addCase(bookingData.pending, (state)=>{
            state.loading=true
        })
        builder.addCase(bookingData.fulfilled, (state, action)=>{
            state.loading=false,
            state.bookings=action.payload,
            state.error=null
        })
        builder.addCase(bookingData.rejected, (state, action)=>{
            state.loading=false,
            state.bookings=[],
            state.error=action.error.message
        })

        builder.addCase(postbooking.pending, (state)=>{
            state.loading=true
        })
        builder.addCase(postbooking.fulfilled, (state, action)=>{
            state.loading=false,
            state.bookings=[...state.bookings, action.payload],
            state.error=null
        })
        builder.addCase(postbooking.rejected, (state, action)=>{
            state.loading=false,
            state.bookings=[],
            state.error=action.error.message
        })
    }
})
export default bookingDataSlice.reducer;