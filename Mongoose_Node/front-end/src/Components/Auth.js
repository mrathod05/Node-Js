import React, { useContext } from 'react'
import { Navigate, Outlet }  from 'react-router-dom'
import { GlobalContext } from './GlobalContext'
 
const Auth = () => {
  const {Logindata}= useContext(GlobalContext)

  return Logindata ? <Outlet/> : <Navigate to='/login'/>
}

export default Auth
