import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialReviewState={
    loading:false,
    reviews:[],
    error:null
}

export const postReviews = createAsyncThunk("review/postReviews", async(info)=>{
    try {
        const res = await axios.post(`https://book-review-rn-default-rtdb.firebaseio.com/reviews.json`, info);
        if(res.status===200){
            return {
                ...info,
                key:res.data.name
            }
        }
    } catch (error) {
        throw Error(error.message);
    }
})

export const getReviews = createAsyncThunk("review/getReviews", async(id)=>{
    try {
        const res = await axios.get(`https://book-review-rn-default-rtdb.firebaseio.com/reviews.json`);
        if(res.status===200){
            let newarr = [];
            for (const key in res.data) {
                if(res.data[key].bookId===id){
                    newarr.push({
                        ...res.data[key],
                        key:key
                    })
                }
            }
            return newarr;
        }
    } catch (error) {
        throw Error(error.message);
    }
})


const reviewsSlice = createSlice({
    name:"review",
    initialState:initialReviewState,
    extraReducers:(builder)=>{
        //Fetch Reviews
        builder.addCase(getReviews.pending, (state)=>{
            state.loading=true
        })
        builder.addCase(getReviews.fulfilled, (state, action)=>{
            state.loading=false,
            state.reviews=action.payload,
            state.error=null
        })
        builder.addCase(getReviews.rejected, (state, action)=>{
            state.loading=false,
            state.reviews=[],
            state.error=action.error.message
        })

        //Post reviews
        builder.addCase(postReviews.pending, (state)=>{
            state.loading=true
        })
        builder.addCase(postReviews.fulfilled, (state, action)=>{
            state.loading=false,
            state.reviews=state.reviews.concat(action.payload),
            state.error=null
        })
        builder.addCase(postReviews.rejected, (state, action)=>{
            state.loading=false,
            state.reviews=[],
            state.error=action.error.message
        })
    }
})

export default reviewsSlice.reducer;