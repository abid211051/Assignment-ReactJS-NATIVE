import { createSlice } from "@reduxjs/toolkit";

const initialauth = {
    islogin: JSON.parse(localStorage.getItem('islogin'))
}

const authSlice = createSlice({
    name:'auth',
    initialState:initialauth,
    reducers: {
        authcheck(state){
            state.islogin = JSON.parse(localStorage.getItem('islogin'))
        },
        logout(state){
            localStorage.clear();
            state.islogin = false
        }
    }
})

export const {authcheck, logout} = authSlice.actions
export default authSlice.reducer