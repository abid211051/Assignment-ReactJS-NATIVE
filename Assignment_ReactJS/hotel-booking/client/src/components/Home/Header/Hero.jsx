import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <>
            <div className="hero min-h-screen" style={{ backgroundImage: 'url(/assets/Hero-test.jpeg)'}}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-6xl font-bold">Hello there</h1>
                        <p className="mb-5 text-lg text-white">Welcome To The 
                        <span className='text-2xl text-yellow-400'> Hotel Error.</span> We provide best quality Rooms and services for you. So please take a moment to look our site, and we hope you will give us a chance to make your travel more joyful! </p>
                        <Link to={'/book-room'} className="btn btn-outline btn-warning rounded-none w-full border-white text-xl border-2 text-lime-100">Book Now</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero
