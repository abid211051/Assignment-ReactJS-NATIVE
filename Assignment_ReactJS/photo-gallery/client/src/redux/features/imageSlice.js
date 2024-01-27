import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const initialImgstate = {
    loading: false,
    imgData: [],
    error: null
}

export const fetchImg = createAsyncThunk("image/fetchImg", async () => {
    const response = await axios.get(`http://localhost:3001/images`);
    return response.data;
});

const imageslice = createSlice({
    name: 'image',
    initialState: initialImgstate,
    extraReducers: (builder) => {
        builder.addCase(fetchImg.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchImg.fulfilled, (state, action) => {
            state.loading = false,
                state.imgData = action.payload,
                state.error = null
        })
        builder.addCase(fetchImg.rejected, (state, action) => {
            state.loading = false,
                state.imgData = [],
                state.error = action.error.message
        })
    }
})

export default imageslice.reducer