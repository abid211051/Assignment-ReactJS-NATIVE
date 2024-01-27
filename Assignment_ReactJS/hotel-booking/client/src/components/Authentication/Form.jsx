import React, { useState } from 'react'

const Form = ({handleSubmit,toggleAuth, changeToggle}) => {
    return (
        <>
            <div className="card shrink-0 md:w-[50%] lg:w-[40%]  bg-base-100">
                <form className="sm:p-3 p-2" onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input name='email' type="email" placeholder="Email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input name='password' type="password" placeholder="Password" className="input input-bordered" required />
                    </div>
                    {toggleAuth && <div className="form-control">
                        <label className="label">
                            <span className="label-text">Confirm Password</span>
                        </label>
                        <input name='cpassword' type="password" placeholder="Confirm Password" className="input input-bordered" required />
                    </div>}
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">{toggleAuth ? "SignUp" : "SignIn"}</button>
                    </div>
                    <div>
                        <p className='text-center'>{toggleAuth ? "Already have an account?":"Don't have any account? please " }<span className='link text-blue-600' onClick={changeToggle}>{toggleAuth?"SignIn":"SignUp"}</span></p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Form
