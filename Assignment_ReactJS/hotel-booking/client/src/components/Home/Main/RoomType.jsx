import React from 'react'
import { useSelector } from 'react-redux'

const RoomType = () => {
    const { hoteldata } = useSelector(state => state.alldata);
    return (
        <>
            <div className='w-[100%] flex items-center justify-center flex-col p-2 sm:p-10 sm:mb-[60px] sm:mt-[90px] mb-[60px] mt-[50px]'>
                <h1 className='text-5xl mb-5 border-solid border-b-2 border-black font-medium font-serif'>ROOMS</h1>
                <p className='text-lg mb-2'>&larr; Scroll left or right &rarr;</p>
                <div className="carousel carousel-center rounded-box w-[100%] flex gap-4">
                    {
                        hoteldata.rooms?.map((item) => (
                            <div className="carousel-item sm:w-[50%] w-[100%]" key={item.id}>
                                <img src={item.homepic} alt="Room Sample Picture" className='w-[100%] object-contain' />
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default RoomType
