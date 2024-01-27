import React from 'react'
import {useSelector} from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';
const PrivateParent = () => {
    const {islogin} = useSelector(state=>state.auth);
  return (
    <>
      {islogin ? <Outlet/>:<Navigate to={'/signin'}/>}
    </>
  )
}

export default PrivateParent
