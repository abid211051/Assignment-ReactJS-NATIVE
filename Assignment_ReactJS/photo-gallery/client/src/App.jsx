import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import SignIn from "./components/auth/SignIn"
import Feedback from "./components/private/Feedback"
import PrivateRoute from "./components/private/PrivateRoute"
import { authcheck } from "./components/loader/authcheck";
function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<Navbar/>,
      children:[
        {
          index:true,
          element:<Home/>
        },
        {
          path:'/sign',
          element:<SignIn/>
        },
        {
          path:'/private/',
          element:<PrivateRoute/>,
          loader : authcheck,
          children:[
            {
              path:'feedback/:id',
              element:<Feedback/>
            }
          ]
        }
      ]
    }
  ])
  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
