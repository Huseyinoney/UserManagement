import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

// const ProtectedRouteHome = () => {
//     const token = localStorage.getItem("token")
//     return token ? <Outlet/> : <Navigate to="/"/>
// }

// export default ProtectedRouteHome

// export const ProtectedRoute = () => {
//     const token = localStorage.getItem("token")
//     return token ? <Navigate to="/Home"/>  : <Outlet/> 
// }

const ProtectedRouteHome = () => {
    const {token,isAuth} = useSelector(state => state.auth.auth)
    return token && isAuth ===true ? <Outlet/> : <Navigate to="/"/>
}

export default ProtectedRouteHome

export const ProtectedRoute = () => {
    const {token,isAuth} = useSelector(state => state.auth.auth)
    
    return token && isAuth ===true ? <Navigate to="/Home"/>  : <Outlet/> 
}




  