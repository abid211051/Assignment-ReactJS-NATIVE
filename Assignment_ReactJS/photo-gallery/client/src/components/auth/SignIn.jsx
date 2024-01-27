import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { postUser } from '../../redux/features/userSlice';
import { authUser } from '../../redux/features/userSlice';
import { useNavigate } from 'react-router-dom'
import {authcheck} from'../../redux/features/authSlice';
import useError from '../hooks/useError';
const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.users);
    const { message, setError } = useError();
    const [toggle, setToggle] = useState(false);
    const [div, setDiv] = useState({ nameDiv: null, passwordDiv: null });
    useEffect(() => {
        if (toggle) {
            const passdiv = (
                <div>
                    <label htmlFor="">Confirm Password:</label>
                    <input type="text" name='confirmpass' placeholder='Confirm Password' required={true} />
                </div>)
            const namediv = (
                <div>
                    <label htmlFor="">Name:</label>
                    <input type="Text" name='fullname' placeholder='Put your name' required={true} />
                </div>
            )
            setDiv({
                nameDiv: namediv,
                passwordDiv: passdiv
            });
        }
        else {
            setDiv({
                nameDiv: null,
                passwordDiv: null
            });
        }
    }, [toggle])
    const handleSubmitForm = async (e) => {
        e.preventDefault();
        try {
            if (toggle) {
                const name = e.target.fullname.value;
                const email = e.target.email.value;
                const password = e.target.password.value;
                const confirmpass = e.target.confirmpass.value;
                if (password === confirmpass) {
                    const response = await dispatch(postUser({ email, password, name }));
                    if (response.meta.requestStatus === 'fulfilled') {
                        setToggle(!toggle);
                    }
                    else {
                        setError(response.error.message);
                    }
                } else {
                    setError('Password is not matching, Confirm your password');
                }
            }
            else {
                const email = e.target.email.value;
                const password = e.target.password.value;
                const response = await dispatch(authUser({ email, password }));
                if (response.meta.requestStatus === 'fulfilled') {
                    dispatch(authcheck());
                    navigate('/')
                }
                else {
                    setError(response.error.message);
                }
            }
        } catch (error) {
            setError(error.message);
        }
    };
    return (
        <>
            <div className='form-main-div'>
                {
                    message != null ?
                        <div className='error'>
                            <h4>{message}</h4>
                        </div>
                        :
                        null
                }
                {loading ?
                    <>
                        <div className='loader'>
                            <img src="assets/icons8-loading-48.png" alt="" />
                        </div>
                    </>
                    :
                    <>
                        <h3 style={{ textAlign: 'center' }}>
                            {toggle ? 'Please SignUp' : 'Please SignIn if you are registerd'}
                        </h3>
                        <form action="" className='form' onSubmit={handleSubmitForm}>
                            {div.nameDiv}
                            <div>
                                <label htmlFor="">Email:</label>
                                <input type="email" name='email' placeholder='Email' required={true} />
                            </div>
                            <div>
                                <label htmlFor="">Password:</label>
                                <input type="text" name='password' placeholder='Password' required={true} />
                            </div>
                            {div.passwordDiv}
                            <div>
                                <button type='submit'>
                                    {toggle ? 'SignUp' : 'SignIn'}
                                </button>
                            </div>
                        </form>
                        <div>
                            <span>
                                {toggle ? 'Already have an account?' : 'Do you have an account?if not'}
                                <button onClick={() => setToggle(!toggle)}>
                                    {toggle ? 'SignIn' : 'SignUp'}
                                </button>
                            </span>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default SignIn;