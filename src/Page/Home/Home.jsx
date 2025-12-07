import React from 'react'
import Slider from './Slider/Slider'
import Service from './Services/Service'
import LatestProduct from './Latest-Product/LatestProduct'

const Home = () => {
  return (
    <div>
        <section className='w-11/12 mx-auto px-2'>
            <Slider />
            <Service />
            <LatestProduct />
        </section>
    </div>
  )
}

export default Home