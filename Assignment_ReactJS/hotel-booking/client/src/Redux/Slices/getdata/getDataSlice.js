import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios'

const initialState = {
    loading:false,
    hoteldata : {},
    error :null
}

export const fetchData = createAsyncThunk('hotel/fetchData', async()=>{
    try {
        const response = await axios.get('http://localhost:3001/hoteldata');
        return response.data;
    } catch (error) {
        throw Error(error.message);
    }
})

const hotelDataSlice = createSlice({
    name:'hotel',
    initialState:initialState,
    extraReducers: (builder)=>{
        builder.addCase(fetchData.pending, (state)=>{
            state.loading=true
        })
        builder.addCase(fetchData.fulfilled, (state, action)=>{
            state.loading=false,
            state.hoteldata=action.payload,
            state.error=null
        })
        builder.addCase(fetchData.rejected, (state, action)=>{
            state.loading=false,
            state.hoteldata=[],
            state.error=action.error.message
        })
    }
})
export default hotelDataSlice.reducer;