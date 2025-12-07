import React from 'react'
import Title from '../../../Components/Title/Title'
import LatestProductCom from '../../../Components/Latest-Product-Com/LatestProductCom'


const LatestProduct = () => {
  return (
    <div>
        <Title text2={"Latest Product"} />

        <section className='px-8'>
           <LatestProductCom></LatestProductCom>
        </section>
    </div>
  )
}

export default LatestProduct