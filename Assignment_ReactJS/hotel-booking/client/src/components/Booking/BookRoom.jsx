import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import { useSelector } from 'react-redux'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import RoomCard from './RoomCard';
const BookRoom = () => {
  const { hoteldata } = useSelector(state => state.alldata);
  const { bookings } = useSelector(state => state.booking);

  const [filterdata, setFilterdata] = useState({
    room: [],
    count: 0
  });
  const [dateselection, setDateSelection] = useState({
    startDate: new Date('1-12-2024'),
    endDate: new Date('1-12-2024'),
    key: 'selection',
  })
  function handlesubmit(e) {
    const inpstart = new Date(dateselection.startDate);
    const inpend = new Date(dateselection.endDate);

    if (bookings.length > 0) {
      let room = [];
      for (const book of bookings) {
        const checkin = new Date(book.checkin);
        const checkout = new Date(book.checkout);
        // is input start or end Date in between existing booking Date.
        if ((inpstart >= checkin && inpstart <= checkout) || (inpend >= checkin && inpend <= checkout)) {
          const roomid = book.roomId;
          room.push({ roomid });
        }
        // Check if existing booking Date in between input start to end Date.
        else if (inpstart < checkin && inpend > checkout) {
          const roomid = book.roomId;
          room.push({ roomid });
        }
      }
      setFilterdata({ room: room, count: filterdata.count + 1 });
    }
    else{
      setFilterdata({ ...filterdata, count: filterdata.count + 1 });

    }
  }
  return (
    <>
      <div className='bg-slate-100 pl-[20px] pr-[20px] sm:pl-[60px] sm:pr-[60px] w-full pt-[140px] mb-10'>
        <div className='lg:w-[83%] m-auto flex flex-col justify-center items-center'>
          <h2 className='text-2xl font-bold text-center'>ROOMS AND DETAILS</h2>
          <p className='text-base text-orange-600 font-medium text-center'>Please verify room availability before confirming your booking.</p>
        </div>
        <div className='flex flex-col  mb-8 gap-2 lg:w-[83%] m-auto'>
          <DateRangePicker
            ranges={[dateselection]}
            onChange={(ranges) => setDateSelection(ranges.selection)}
            minDate={new Date()}
            className='flex flex-col justify-start items-start shadow-lg'
          />
          <button onClick={handlesubmit} className='text-xl btn btn-outline md:w-[300px]'>Check Availability</button>
        </div>
        <div>
          {hoteldata.rooms?.map((item) => {
            const isRoomAvailable = filterdata.count > 0 && !filterdata.room.some((filterRoom) => filterRoom.roomid === item.id);
            return <RoomCard key={item.id} item={item} available={isRoomAvailable} dateselection={dateselection} />;
          })}
        </div>

      </div>
    </>
  )
}

export default BookRoom
