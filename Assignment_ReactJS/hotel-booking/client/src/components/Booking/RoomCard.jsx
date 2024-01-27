import React from 'react'
import DetailsModal from './DetailsModal'
import {Link} from 'react-router-dom'

const RoomCard = ({ item, available, dateselection}) => {
    const {startDate, endDate} = dateselection;
    return (
        <>
            <div className="cursor-pointer hover:scale-[101%] transition-all card md:card-side bg-base-100 shadow-2xl lg:w-[83%] m-auto mb-8">
                <div className='md:w-[40%] flex items-center justify-center'><img src={item.homepic} alt={item.type} className='w-full object-contain' /></div>
                <div className="md:w-[60%] flex flex-col p-2 sm:p-2 m-0">
                    <div className='flex sm:flex-row justify-between flex-col mb-3'>
                        <h2 className="card-title font-bold text-2xl">{item.type}</h2>
                        <p className="p-1 bg-slate-200 rounded-none rounded-r-xl">From <span className='text-xl sm:text-2xl font-semibold'>&#2547;{item.price}</span><br />Per Room/Night</p>
                    </div>
                    <div className='flex flex-col justify-between h-full'>
                        <div>
                            <p className='font-medium text-slate-500'>Bed Type: <span className='font-bold'>{item.bed}</span></p>
                            <p className='font-medium text-slate-500'>Max Room Capacity: <span className='font-bold'> {item.maxCapacity}</span> <img src='\assets\humanIcon.png' className='inline-block w-[15px]' /></p>
                        </div>
                        <div className="card-actions flex flex-col justify-between items-end mt-2">
                            <button className='text-lg rounded-none rounded-r-xl btn btn-outline font-semibold' onClick={() => document.getElementById(`my_modal_${item.id}`).showModal()}>Details</button>
                            {available? 
                            <Link to={`/order/${startDate}/${endDate}/${item.id}/${item.price}`} className="text-lg btn btn-accent btn-outline w-full">CONFIRM BOOKING</Link>
                            :
                            <p className='w-full text-xl text-center p-1 bg-rose-700 text-white'>Not Available</p>
                            }
                        </div>
                    </div>
                </div>
                <DetailsModal room={item} available={available} dateselection={dateselection}/>
            </div>
        </>
    )
}

export default RoomCard
