import React from 'react'
import {Link} from 'react-router-dom'
const DetailsModal = ({ room, available, dateselection}) => {
    const {startDate, endDate} = dateselection;
    return (
        <>
            <dialog id={`my_modal_${room.id}`} key={room.id} className="modal" >
                <div className="modal-box w-11/12 max-w-5xl md:flex m-0 p-0 rounded-none relative">
                    <div className='md:w-[50%]'>
                        <img src={room.modalpic} alt="" />
                    </div>
                    <div className='md:w-[50%] p-4'>
                        <h3 className="font-bold text-xl">{room.type} ROOM</h3>
                        <p className="py-4">{room.description}</p>
                        <div className='flex md:flex-row flex-col gap-3 justify-between py-4'>
                            <p className='font-semibold'>Room View <br /> <span className='font-normal'>{room.roomView}</span></p>
                            <p className='font-semibold'>Bed Type <br /> <span className='font-normal'>{room.bed}</span></p>
                            <p className='font-semibold'>Room Size <br /> <span className='font-normal'>{room.roomSize}</span></p>
                        </div>
                        <div className='py-3'>
                            <p className='text-lg font-semibold'>ROOM AMENITIES</p>
                            <div className='grid sm:grid-cols-2 gap-2'>
                                {room?.amenities?.map((item, index) => (
                                    <p key={index}><img src='\assets\tikicon.png' className='inline-block w-[15px]' /> {item}</p>
                                ))}
                            </div>
                            <p className="mt-4 mb-1 p-1 bg-slate-200 ">From <span className='text-xl sm:text-2xl font-semibold'>&#2547;{room.price}</span><br />Per Room/Night</p>
                            {available? 
                            <Link to={`/order/${startDate}/${endDate}/${room.id}/${room.price}`} className="text-lg btn btn-accent btn-outline w-full">CONFIRM BOOKING</Link>
                            :
                            <p className='w-full text-xl text-center p-1 bg-rose-700 text-white'>Not Available</p>
                            }
                        </div>
                        <div className="modal-action fixed md:-top-5 right-0 p-1">
                            <form method="dialog">
                                <button className="btn rounded-full btn-outline btn-accent border-[2px]"><img src='\assets\exiticon.png' className='inline-block w-[20px]' /></button>
                            </form>
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default DetailsModal
