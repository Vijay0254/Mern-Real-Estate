import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

const ProtectedRoute2 = () => {

  //This Protected Route is for Avoiding user to go to Profile Page when user is not logged in
  const { user } = useAuthStore()

  return user ? <Outlet /> : <Navigate to={`/login`} />
}

export default ProtectedRoute2