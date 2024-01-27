import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HomeMain from "./components/Home/HomeMain";
import SignIn from "./components/Authentication/SignIn";
import BookRoom from "./components/Booking/BookRoom";
import {useDispatch} from 'react-redux';
import {fetchData} from './Redux/Slices/getdata/getDataSlice';
import {bookingData} from './Redux/Slices/getdata/bookingSlice';
import PrivateParent from "./components/Private/PrivateParent";
import ConfirmBook from "./components/Private/ConfirmBook";

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchData());
    dispatch(bookingData());
  }, [])
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          index: true,
          element: <HomeMain />
        },
        {
          path: 'signin',
          element: <SignIn />
        },
        {
          path: 'book-room',
          element: <BookRoom />
        },
        {
          path :'/',
          element: <PrivateParent/>,
          children:[
            {
              path:'order/:checkin/:checkout/:roomId/:price',
              element:<ConfirmBook/>
            }
          ]
        }
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
