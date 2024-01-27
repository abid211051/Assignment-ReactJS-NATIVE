import React, { useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {logout} from '../../Redux/Slices/auth/authSlice'
const Navbar = () => {
  const dispatch = useDispatch()
  const { islogin } = useSelector(state => state.auth);
  return (
    <>
      <div className="navbar bg-base-100 shadow-md rounded-b-3xl fixed z-10">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {islogin ?
                <li><Link className='text-lg mb-2' onClick={()=>dispatch(logout())}>LogOut</Link></li>
                :
                <li><Link to={'/signin'} className='text-lg mb-2'>SignIn</Link></li>
              }
              <li><Link to={'/book-room'} className="btn btn-outline btn-accent rounded-none pt-3">Book Now</Link></li>
            </ul>
          </div>
          <a className="btn btn-outline text-xl font-serif border-none">Hotel Error</a>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {islogin ?
              <li><Link className='text-lg mr-2' onClick={()=>dispatch(logout())}>LogOut</Link></li>
              :
              <li><Link to={'/signin'} className='text-lg mr-2'>SignIn</Link></li>
            }
            <li><Link to={'/book-room'} className="btn btn-outline btn-accent rounded-none pt-4 rounded-e-full">Book Now</Link></li>
          </ul>
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default Navbar
