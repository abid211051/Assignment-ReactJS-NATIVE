import React from 'react'
import { useParams } from 'react-router-dom'
import { postbooking } from '../../Redux/Slices/getdata/bookingSlice'
import { useDispatch } from 'react-redux'
import useError from '../../Hooks/useError'
const ConfirmBook = () => {
  const dispatch = useDispatch();
  const { message, setError } = useError()
  let { checkin, checkout, roomId, price } = useParams();
  const handleBooking = async (e) => {
    e.preventDefault();
    const newcheckin = new Date(checkin);
    const newcheckout = new Date(checkout);
    let day = (newcheckout - newcheckin);
    day = (day / (1000 * 60 * 60 * 24)) + 1;
    const paid = parseInt(price) * day;
    const name = e.target.fname.value;
    const phone = e.target.phone.value;
    roomId = parseInt(roomId);
    const res = await dispatch(postbooking({ name, phone, checkin, checkout, paid, roomId }))
    if (res.meta.requestStatus !== 'fulfilled') {
      setError(res.error.message);
    }
    else {
      e.target.fname.value = null;
      e.target.phone.value = null;
      setError('Booking Request placed successfully');
    }
  }
  return (
    <>
      <div className="w-full min-h-screen bg-base-200 p-2 lg:p-10 sm:p-5 flex flex-col justify-center items-center">
        <div className="w-[100%] flex flex-col  items-center gap-8 mt-2">
          {message !== null &&
            <div role="alert" className="flex items-center justify-center alert alert-error m-0 p-2">
              <span className='text-lg font-semibold text-white'>{message}</span>
            </div>}
          <div className="w-full text-center  flex flex-col justify-center">
            <h1 className="text-4xl font-bold">Confirm Order</h1>
            <p className="">Please provide your valid name and phone number to confirm your sit. we will contact you through the information</p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body p-2" onSubmit={handleBooking}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" name='fname' placeholder="Name" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone</span>
                </label>
                <input type="text" name='phone' placeholder="Phone Number" className="input input-bordered" required />
              </div>
              <div className="form-control mt-6">
                <button type='submit' className="btn btn-outline btn-success text-xl">Place a Booking</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConfirmBook
