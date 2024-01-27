import React from 'react'
import { Navigate, Outlet, useLoaderData } from 'react-router-dom';

const PrivateRoute = () => {
  const islogin = useLoaderData();
  return (
    <div>
      {islogin?<Outlet/>:<Navigate to={'/sign'}/>}
    </div>
  )
}

export default PrivateRoute
