import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import { Outlet } from 'react-router'

const AuthLayout = () => {
  return (
    <div>
        <Navbar />
            <main className='w-9/12 mx-auto py-10'>
                <Outlet />
            </main>
        <Footer />
    </div>
  )
}

export default AuthLayout