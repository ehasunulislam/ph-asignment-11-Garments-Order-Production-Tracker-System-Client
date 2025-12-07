import React from 'react'
import Title from '../../Components/Title/Title'
import AllProductsCom from '../../Components/All-Products-Com/AllProductsCom'

const AllProducts = () => {
    
  return (
    <div>
        <Title text2={"All Products"} />

        <section className='py-6'>
            <AllProductsCom />
        </section>
    </div>
  )
}

export default AllProducts