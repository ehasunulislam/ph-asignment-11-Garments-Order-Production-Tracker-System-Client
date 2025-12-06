import React from 'react'
import { assets } from '../../assets/assets'
import Lottie from 'lottie-react'
import { Link } from 'react-router'

const Error = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Lottie
        animationData={assets.error}
        loop={true}
        className="w-60 md:w-120"
      />
      <h2 className='text-[1rem] md:text-3xl font-bold text-gray-400'>Page not found</h2>
      <Link to="/" className='btn btn-primary mt-3'>Back to home</Link>
    </div>
  )
}

export default Error