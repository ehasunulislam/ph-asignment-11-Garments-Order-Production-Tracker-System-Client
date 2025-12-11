import React from 'react'
import Slider from './Slider/Slider'
import Service from './Services/Service'
import LatestProduct from './Latest-Product/LatestProduct'
import NewsLetter from './NewsLetter/NewsLetter'
import Reviews from './Reviews/Reviews'

const Home = () => {
  return (
    <div>
        <section className='w-11/12 mx-auto px-2'>
            <Slider />
            <Service />
            <LatestProduct />
            <Reviews/>
        </section>
        <NewsLetter />
    </div>
  )
}

export default Home