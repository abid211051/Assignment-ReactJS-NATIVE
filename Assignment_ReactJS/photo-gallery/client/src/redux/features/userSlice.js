import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialUserstate = {
    loading: false,
    user: null,
    error: null
}

export const postUser = createAsyncThunk('user/postUser', async (value) => {
    const response = await axios.post('http://localhost:3001/users', value)
    return {
        email: response.data.email,
        id: response.data.id
    }
})
export const authUser = createAsyncThunk('user/authUser', async (value) => {
    const response = await axios.get('http://localhost:3001/users');
    const user = response.data.filter((user) => user.email === value.email);
    if (user[0]) {
        if (user[0].password === value.password) {
            localStorage.setItem('email', user[0].email);
            localStorage.setItem('id', user[0].id);
            localStorage.setItem('islogin', true);
            localStorage.setItem('name', user[0].name);
            return {
                email: user[0].email,
                id: user[0].id
            }
        }
        else {
            throw Error('Password did not match');
        }
    }
    else{
        throw Error('User Not Found, Recheck your email or SignUp')
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserstate,
    extraReducers: (builder) => {
        builder.addCase(postUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(postUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        })
        builder.addCase(postUser.rejected, (state, action) => {
            state.loading = false;
            state.user = null
            state.error = action.error.message;
        })
        builder.addCase(authUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(authUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        })
        builder.addCase(authUser.rejected, (state, action) => {
            state.loading = false;
            state.user = null
            state.error = action.error.message;
        })
    }
})

export default userSlice.reducer;