import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialBookState = {
    loading:false,
    books:[],
    filterdBook:[],
    error:null
}

export const getbooksData = createAsyncThunk('books/getbooksData', async(s, d)=>{
    try {
        const res = await axios.get(`https://book-review-rn-default-rtdb.firebaseio.com/books.json`);
        if(res.status===200){
            return res.data;
        }
    } catch (error) {
        throw Error(error.message);
    }
})

const booksSlice = createSlice({
    name:'books',
    initialState:initialBookState,
    reducers:{
        filterbook(state, action){
            if(action.payload==="All"){
                state.filterdBook=state.books
            }
            else if(action.payload==="Adventure"){
                let arr = [];
                for (const iterator of state.books) {
                    if(iterator.category==="Adventure"){
                        arr.push(iterator);
                    }
                }
                state.filterdBook=arr;
            }
            else if(action.payload==="Fantasy"){
                let arr = [];
                for (const iterator of state.books) {
                    if(iterator.category==="Fantasy"){
                        arr.push(iterator);
                    }
                }
                state.filterdBook=arr;
            }
            else if(action.payload==="Sci-Fi"){
                let arr = [];
                for (const iterator of state.books) {
                    if(iterator.category==="Sci-Fi"){
                        arr.push(iterator);
                    }
                }
                state.filterdBook=arr;
            }
            else if(action.payload==="Historical"){
                let arr = [];
                for (const iterator of state.books) {
                    if(iterator.category==="Historical"){
                        arr.push(iterator);
                    }
                }
                state.filterdBook=arr;
            }
            else if(action.payload==="Horror"){
                let arr = [];
                for (const iterator of state.books) {
                    if(iterator.category==="Horror"){
                        arr.push(iterator);
                    }
                }
                state.filterdBook=arr;
            }
        }
    },
    extraReducers:(builder)=>{
        // Fetch book data
        builder.addCase(getbooksData.pending, (state)=>{
            state.loading=true
        })
        builder.addCase(getbooksData.fulfilled, (state, action)=>{
            state.loading=false,
            state.books=action.payload,
            state.filterdBook=state.books,
            state.error=null
        })
        builder.addCase(getbooksData.rejected, (state, action)=>{
            state.loading=false,
            state.books=[],
            state.error=action.error.message
        })
    }
})

export const {filterbook} = booksSlice.actions;
export default booksSlice.reducer;