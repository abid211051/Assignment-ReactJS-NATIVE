import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {authcheck, logout} from '../redux/features/authSlice';
const Navbar = () => {
    const dispatch = useDispatch();
    const [div, setDiv] = useState(null);
    const {islogin} = useSelector(state=>state.auth)
    useEffect(() => {
        const divContent = islogin ? (
          <div className='link'>
            <Link onClick={handleLogout}>LogOut</Link>
          </div>
        ) : (
          <div className='link'>
            <Link to={'/sign'}>SignIn</Link>
          </div>
        );
        setDiv(divContent);
      }, [islogin]);

      const handleLogout = () => {
        dispatch(logout());
      };
      return (
        <>
            <nav>
                <div className='nav-icon'>
                    <h4>Photo Gallery</h4>
                </div>
                <div className='link-div'>
                    <div className='link'>
                        <Link>Home</Link>
                    </div>
                    {div}
                </div>
            </nav>
            <Outlet />
        </>
    )
}

export default Navbar
