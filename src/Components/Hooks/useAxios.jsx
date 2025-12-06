import axios from 'axios'
import React from 'react'

const axiosMethod = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
})

const useAxios = () => {
  return axiosMethod
}

export default useAxios