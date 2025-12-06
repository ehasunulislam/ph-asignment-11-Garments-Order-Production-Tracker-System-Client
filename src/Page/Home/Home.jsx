import React from 'react'
import Slider from './Slider/Slider'
import Service from './Services/Service'

const Home = () => {
  return (
    <div>
        <section className='w-11/12 mx-auto px-2'>
            <Slider />
            <Service />
        </section>
    </div>
  )
}

export default Home