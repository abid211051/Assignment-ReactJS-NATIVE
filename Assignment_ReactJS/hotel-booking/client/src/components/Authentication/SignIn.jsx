import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, signUp } from '../../Redux/Slices/auth/userSlice'
import useError from '../../Hooks/useError'
import { useNavigate } from 'react-router-dom'
import { islogin } from '../../Redux/Slices/auth/authSlice'
import Form from './Form'
const SignIn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { message, setError } = useError();
    const [toggleAuth, setToggleAuth] = useState(false);
    const [calltrack, setCalltrack] = useState(false);
    const { error } = useSelector(state => state.user)
    const changeToggle = ()=>{
        setToggleAuth(!toggleAuth);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (toggleAuth) {
            const email = e.target.email.value;
            const password = e.target.password.value;
            const confirmPass = e.target.cpassword.value;
            if (password !== confirmPass) {
                setError('Confirm your Password');
            }
            else {
                const res = await dispatch(signUp({email, password}));
                if(res.meta.requestStatus==="fulfilled"){
                    setError('Registerd Successfully. Please Login')
                    setToggleAuth(!toggleAuth);
                }
                else{
                    setCalltrack(!calltrack);
                }
            }
        }
        else {
            const email = e.target.email.value;
            const password = e.target.password.value;
            const res = await dispatch(login({ email, password }));
            if(res.meta.requestStatus==="fulfilled"){
                dispatch(islogin());
                navigate('/')
            }
            setCalltrack(!calltrack);
        }
    }
    useEffect(() => {
        setError(error)
    }, [error, calltrack])
    return (
        <>
            <div className="w-full min-h-screen bg-base-200 p-2 lg:p-10 sm:p-5 flex flex-col justify-center items-center">
                {message !== null &&
                    <div role="alert" className="flex items-center justify-center alert alert-error m-0 p-2">
                        <span className='text-lg font-semibold text-white'>{message}</span>
                    </div>}
                <div className="w-[100%] flex flex-col md:flex-row-reverse gap-8 mt-2">
                    <div className="md:w-[50%] lg:w-[60%] text-center lg:text-left flex flex-col justify-center">
                        <h1 className="text-4xl font-bold">{toggleAuth? 'SignUp now!' : 'SignIn now!'}</h1>
                        <p className="">We ensure authenticity for our all customer. So please provide valid information before SignUp and SignIn .</p>
                    </div>
                    <Form handleSubmit={handleSubmit} toggleAuth={toggleAuth} changeToggle={changeToggle}/>
                </div>
            </div>
        </>
    )
}

export default SignIn
