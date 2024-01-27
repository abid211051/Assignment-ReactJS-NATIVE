import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initalState = {
    loading: false,
    acc: [],
    error: null
}

export const postaccdata = createAsyncThunk('account/postaccdata', async (item) => {
    try {
        const res = await axios.post(`https://finance-app-rn-default-rtdb.firebaseio.com/accounts.json`, item);
        if(res.status===200){
            return {
                Id: res.data.name,
                balance: item.balance,
                type: item.type
            }
        }
    } catch (error) {
        throw Error(error.message);
    }
})
export const getaccdata = createAsyncThunk('account/getaccdata', async () => {
    try {
        const res = await axios.get(`https://finance-app-rn-default-rtdb.firebaseio.com/accounts.json`);
        let accdata = [];
        for (const key in res.data) {
            const dd = {
                Id: key,
                balance: res.data[key].balance,
                type: res.data[key].type
            }
            accdata.push(dd);
        }
        return accdata;
    } catch (error) {
        throw Error(error.message);
    }
})

export const deleteacc = createAsyncThunk('account/deleteacc', async (Id) => {
    try {
        const res = await axios.delete(`https://finance-app-rn-default-rtdb.firebaseio.com/accounts/${Id}.json`);
        if(res.status===200){
             return Id;
        }
    } catch (error) {
        throw Error(error.message);
    }
})
const accountSlice = createSlice({
    name: 'account',
    initialState: initalState,
    extraReducers: (builder) => {
        builder.addCase(getaccdata.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getaccdata.fulfilled, (state, action) => {
            state.loading = false,
                state.acc = action.payload,
                state.error = null
        })
        builder.addCase(getaccdata.rejected, (state, action) => {
            state.loading = false,
                state.acc = [],
                state.error = action.error.message
        })

        builder.addCase(postaccdata.pending, (state) => {
            state.loading = true
        })
        builder.addCase(postaccdata.fulfilled, (state, action) => {
            state.loading = false,
                state.acc = [...state.acc, action.payload],
                state.error = null
        })
        builder.addCase(postaccdata.rejected, (state, action) => {
            state.loading = false,
                state.acc = [],
                state.error = action.error.message
        })

        builder.addCase(deleteacc.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteacc.fulfilled, (state, action) => {
            const newdata = state.acc.filter((item)=>(item.Id!==action.payload));
            state.loading = false,
                state.acc = newdata,
                state.error = null
        })
        builder.addCase(deleteacc.rejected, (state, action) => {
            state.loading = false,
                state.acc = [],
                state.error = action.error.message
        })
    }
})
export default accountSlice.reducer;