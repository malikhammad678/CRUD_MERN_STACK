import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const Private = () => {
    let auth = localStorage.getItem("users")
  return auth? <Outlet /> : <Navigate to = '/signup'/>
}

export default Private
