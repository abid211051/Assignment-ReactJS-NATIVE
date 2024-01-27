import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initalState = {
    loading:false,
    incExp:[],
    error:null
}

export const getdata = createAsyncThunk('incExp/getdata', async()=>{
    try {
        const res = await axios.get(`https://finance-app-rn-default-rtdb.firebaseio.com/incomeExpense.json`);
        if(res.status===200){
            let data = [];
            for (const key in res.data) {
                const obj = {
                    Id: key,
                    accountId:res.data[key].accountId,
                    accountBalance:res.data[key].accountBalance,
                    account:res.data[key].account,
                    category:res.data[key].category,
                    type:res.data[key].type,
                    ammount:res.data[key].ammount,
                    description:res.data[key].description
                }
                data.push(obj);
            }
            return data;
        }
    } catch (error) {
        throw Error(error.message);
    }
})

export const postincExpdata = createAsyncThunk('incExp/postincExpdata', async(item)=>{
    try {
        const res = await axios.post(`https://finance-app-rn-default-rtdb.firebaseio.com/incomeExpense.json`, item);
        if(res.status===200){
            let newbalance;
            if(item.type==="Income"){
                newbalance = (Number(item.accountBalance)+Number(item.ammount));
            }
            else{
                newbalance = (Number(item.accountBalance)-Number(item.ammount));
            }
            const upd = await axios.put(`https://finance-app-rn-default-rtdb.firebaseio.com/accounts/${item.accountId}.json`, {balance:newbalance, type:item.account});
            if(upd.status===200){
                return {
                    Id:res.data.name,
                    accountId:item.accountId,
                    accountBalance:item.accountBalance,
                    account:item.account,
                    category:item.category,
                    type:item.type,
                    ammount:item.ammount,
                    description:item.description
                };
            }
        }
    } catch (error) {
        throw Error(error.message);
    }
})
const incExpSlice = createSlice({
    name:'incExp',
    initialState:initalState,
    extraReducers:(builder)=>{
        builder.addCase(getdata.pending, (state)=>{
            state.loading=true
        })
        builder.addCase(getdata.fulfilled, (state, action)=>{
            state.loading=false,
            state.incExp=action.payload,
            state.error=null
        })
        builder.addCase(getdata.rejected, (state, action)=>{
            state.loading=false,
            state.incExp=[],
            state.error=action.error.message
        })

        builder.addCase(postincExpdata.pending, (state)=>{
            state.loading=true
        })
        builder.addCase(postincExpdata.fulfilled, (state, action)=>{
            state.loading=false,
            state.incExp= [...state.incExp, action.payload],
            state.error=null
        })
        builder.addCase(postincExpdata.rejected, (state, action)=>{
            state.loading=false,
            state.incExp=[],
            state.error=action.error.message
        })
    }
})
export default incExpSlice.reducer;