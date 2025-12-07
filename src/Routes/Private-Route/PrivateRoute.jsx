import React from 'react'
import useAuthInfo from '../../Components/Hooks/useAuthInfo'
import { Navigate, useLocation } from 'react-router';
import PageLoading from '../../Components/Loading/PageLoading';

const PrivateRoute = ({children}) => {

    const {user, loading} = useAuthInfo();

    const location = useLocation();

    if(loading){
        return <PageLoading></PageLoading>
    }

    if(user) {
        return children
    }

  return <Navigate to="/auth/login" state={{from: location}} replace />
}

export default PrivateRoute