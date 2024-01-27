import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initalState = {
    loading: false,
    categories: [],
    error: null
}

export const postcategdata = createAsyncThunk('category/postcategdata', async (item) => {
    try {
        if (item.type === "income") {
            const res = await axios.post(`https://finance-app-rn-default-rtdb.firebaseio.com/categories/0/data.json`, { category: item.category });
            if (res.status === 200) {
                return [
                    {
                        Id: res.data.name,
                        category: item.category
                    },
                    'income'
                ]
            }
        }
        else if (item.type === "expense") {
            const res = await axios.post(`https://finance-app-rn-default-rtdb.firebaseio.com/categories/1/data.json`, { category: item.category });
            if (res.status === 200) {
                return [
                    {
                        Id: res.data.name,
                        category: item.category
                    },
                    'expense'
                ]
            }
        }
    } catch (error) {
        throw Error(error.message);
    }
})
export const getcategdata = createAsyncThunk('category/getcategdata', async (item) => {
    try {
        const res = await axios.get(`https://finance-app-rn-default-rtdb.firebaseio.com/categories.json`);
        let income;
        let expense;
        for (const i in res.data) {
            if (i === '0') {
                income = {
                    title: res.data[i].title,
                    data: []
                }
                for (const key in res.data[i].data) {
                    const newdata = {
                        Id: key,
                        category: res.data[i].data[key].category
                    }
                    income.data.push(newdata)
                }
            }
            else {
                expense = {
                    title: res.data[i].title,
                    data: []
                }
                for (const key in res.data[i].data) {
                    const newdata = {
                        Id: key,
                        category: res.data[i].data[key].category
                    }
                    expense.data.push(newdata)
                }
            }
        }
        return [income, expense]
    } catch (error) {
        throw Error(error.message);
    }
})

export const deletecategory = createAsyncThunk('category/deletecategory', async (item) => {
    try {
        if (item.type === "income") {
            const res = await axios.delete(`https://finance-app-rn-default-rtdb.firebaseio.com/categories/0/data/${item.Id}.json`);
            if (res.status === 200) {
                return {
                    Id: item.Id,
                    type: "income"
                };
            }
        }
        else {
            const res = await axios.delete(`https://finance-app-rn-default-rtdb.firebaseio.com/categories/1/data/${item.Id}.json`);
            if (res.status === 200) {
                return {
                    Id: item.Id,
                    type: "expense"
                };
            }
        }
    } catch (error) {
        throw Error(error.message);
    }
})
const accountSlice = createSlice({
    name: 'category',
    initialState: initalState,
    extraReducers: (builder) => {
        // Post Reducer
        builder.addCase(postcategdata.pending, (state) => {
            state.loading = true
        })
        builder.addCase(postcategdata.fulfilled, (state, action) => {
            if (action.payload[1] === 'income') {
                state.categories[0] = {
                    ...state.categories[0],
                    data: [...state.categories[0].data, action.payload[0]],
                }
            }
            else {
                state.categories[1] = {
                    ...state.categories[1],
                    data: [...state.categories[1].data, action.payload[0]],
                }
            }
            state.loading = false,
                state.error = null
        })
        builder.addCase(postcategdata.rejected, (state, action) => {
            state.loading = false,
                state.categories = [],
                state.error = action.error.message
        })

        // Fetch reducer
        builder.addCase(getcategdata.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getcategdata.fulfilled, (state, action) => {
            state.loading = false,
                state.categories = [...action.payload],
                state.error = null
        })
        builder.addCase(getcategdata.rejected, (state, action) => {
            state.loading = false,
                state.categories = [],
                state.error = action.error.message
        })

        //Delete Reducer
        builder.addCase(deletecategory.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deletecategory.fulfilled, (state, action) => {
            if(action.payload.type==="income"){
                const newcategData = state.categories[0].data.filter((item)=>item.Id!== action.payload.Id);
                state.loading = false,
                state.categories[0]={
                    ...state.categories[0],
                    data:newcategData,
                }
                state.error = null
            }
            else{
                const newcategData = state.categories[1].data.filter((item)=>item.Id!== action.payload.Id);
                state.loading = false,
                state.categories[1]={
                    ...state.categories[1],
                    data:newcategData,
                }
                state.error = null
            }
        })
        builder.addCase(deletecategory.rejected, (state, action) => {
            state.loading = false,
                state.categories = [],
                state.error = action.error.message
        })

    }
})
export default accountSlice.reducer;