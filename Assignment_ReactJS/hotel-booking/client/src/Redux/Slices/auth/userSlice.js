import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialUserState = {
    loading: false,
    user: [],
    error:null
}

export const login = createAsyncThunk('user/login', async (info) => {
    try {
        const response = await axios.get('http://localhost:3001/users');
        const users = response.data;
        const isExist = users.filter((user) => user.email === info.email);
        if (isExist.length > 0) {
            if (isExist[0].password !== info.password) {
                throw Error('Incorrect Password');
            }
            else {
                localStorage.setItem('islogin', true);
                localStorage.setItem('email', isExist[0].email);
                return {
                    email:isExist[0].email
                };
            }
        }
        else{
            throw Error('User Not Found');
        }
    } catch (error) {
        throw Error(error.message);
    }
})

export const signUp = createAsyncThunk('user/signUp', async(info)=>{
    try {
        const response = await axios.post('http://localhost:3001/users', info);
        return true
    } catch (error) {
        throw Error(error.message);
    }
})

const userSlice = createSlice({
    name:'user',
    initialState:initialUserState,
    extraReducers: (builder)=>{
        builder.addCase(login.pending, (state)=>{
            state.loading=true
        })
        builder.addCase(login.fulfilled, (state, action)=>{
            state.loading=false,
            state.user=action.payload,
            state.error=null
        })
        builder.addCase(login.rejected, (state, action)=>{
            state.loading=true,
            state.user=[],
            state.error=action.error.message
        })

        builder.addCase(signUp.pending, (state)=>{
            state.loading=true
        })
        builder.addCase(signUp.fulfilled, (state, action)=>{
            state.loading=false,
            state.user=action.payload,
            state.error=null
        })
        builder.addCase(signUp.rejected, (state, action)=>{
            state.loading=true,
            state.user=[],
            state.error=action.error.message
        })
    }
})

export default userSlice.reducer;