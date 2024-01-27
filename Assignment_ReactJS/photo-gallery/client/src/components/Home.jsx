import React, { useEffect } from 'react'
import ImageData from './gallery/ImageData'
import Footer from './Footer'
const Home = () => {

    return (
        <>
            <div className='container'>
                <ImageData />
            </div>
            <Footer />
        </>
    )
}

export default Home
