import React from 'react'
import { services } from '../../../assets/assets'

const Service = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-10 gap-6'>
        {
            services.map((item) => {
                return (
                    <div key={item.id} className='flex gap-3'>
                        <div className='bg-gray-100 rounded-full h-10 w-10 flex items-center justify-center'>
                            <img src={item.icon} alt={item.title} className='w-6'/>
                        </div>
                        <div>
                            <h3 className='font-bold'>{item.title}</h3>
                            <p className='text-[0.8rem]'>{item.description}</p>
                        </div>
                    </div>
                )
            })
        }
    </div>
  )
}

export default Service