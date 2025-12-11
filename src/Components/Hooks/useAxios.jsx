import axios from "axios";
import React from "react";
// import useAuthInfo from "./useAuthInfo";

const axiosMethod = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

const useAxios = () => {
  // const { user } = useAuthInfo();

  // useEffect(() => {
  //   // intercept request
  //   const result = axiosMethod.interceptors.request.use((config) => {
  //     config.headers.Authorization = `Bearer ${user?.accessToken}`;
  //     return config;
  //   });

  //   console.log(result);
  // }, [user]);

  return axiosMethod;
};

export default useAxios;
