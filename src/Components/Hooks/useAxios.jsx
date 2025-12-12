import axios from "axios";
import React, { useEffect } from "react";
// import { AuthContext } from "../provider/AuthContext";
import useAuthInfo from "./useAuthInfo";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

const useAxios = () => {
  const { user, loading } = useAuthInfo();
  console.log(user);

  useEffect(() => {
    console.log("ACCESS TOKEN FROM useAxios:", user?.accessToken);

    if (!loading && user?.accessToken) {
      // Add request interceptor
      const requestInterceptor = axiosInstance.interceptors.request.use(
        (config) => {
          config.headers.Authorization = `Bearer ${user?.accessToken}`;
          return config;
        }
      );

      // Cleanup to prevent multiple interceptors on re-renders
      return () => {
        axiosInstance.interceptors.request.eject(requestInterceptor);
        // axiosInstance.interceptors.response.eject(responseInterceptor);
      };
    }
  }, [user, loading]);

  return axiosInstance;
};

export default useAxios;