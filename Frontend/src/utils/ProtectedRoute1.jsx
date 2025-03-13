import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

const ProtectedRoute1 = () => {

  //This Protected Route is for Avoiding user to go to Login Page when user is already logged in
  const { user } = useAuthStore()

  return !user ? <Outlet /> : <Navigate to={`/`} />
}

export default ProtectedRoute1