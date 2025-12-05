import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { Outlet } from 'react-router'
import Footer from '../../Components/Footer/Footer'

const HomeLayout = () => {
  return (
    <div>
        <Navbar />

        <main>
            <Outlet></Outlet>
        </main>

        <Footer />
    </div>
  )
}

export default HomeLayout