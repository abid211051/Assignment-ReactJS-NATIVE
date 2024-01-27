import {createSlice} from '@reduxjs/toolkit'

const initialauth = {
    islogin : JSON.parse(localStorage.getItem('islogin'))
}
const authSlice = createSlice({
    name:'auth',
    initialState:initialauth,
    reducers:{
        islogin(state){
            state.islogin=JSON.parse(localStorage.getItem('islogin'));
        },
        logout(state){
            localStorage.clear();
            state.islogin=false;
        }
    }
})
export const {islogin,logout}=authSlice.actions;
export default authSlice.reducer;