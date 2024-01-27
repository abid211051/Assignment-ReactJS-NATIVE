import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialFeedbackState = {
    loading: false,
    feedback: [],
    error: null
}

export const getFeedback = createAsyncThunk('feedback/getFeedback', async (value) => {
    const response = await axios.get('http://localhost:3001/feedback');
    const feedback = response.data.filter((item) => item.imageId=== value.imageId);
    if (feedback.length > 0) {
       return feedback;
    }
    else{
        throw Error('No Feedback for this Picture');
    }
})
export const postFeedback = createAsyncThunk('feedback/postFeedback', async (value) => {
    const response = await axios.post('http://localhost:3001/feedback', value);
    return response.data;
})
const feedbackSlice = createSlice({
    name: 'feedback',
    initialState: initialFeedbackState,
    extraReducers: (builder) => {
        builder.addCase(postFeedback.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(postFeedback.fulfilled, (state, action) => {
            state.loading = false,
                state.feedback = [action.payload],
                state.error = null
        })
        builder.addCase(postFeedback.rejected, (state, action) => {
            state.loading = false,
                state.feedback = [],
                state.error = action.error.message
        })
        builder.addCase(getFeedback.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getFeedback.fulfilled, (state, action) => {
            state.loading = false,
                state.feedback = action.payload,
                state.error = null
        })
        builder.addCase(getFeedback.rejected, (state, action) => {
            state.loading = false,
                state.feedback = [],
                state.error = action.error.message
        })
    }
})

export default feedbackSlice.reducer;