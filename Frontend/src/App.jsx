import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import About from './pages/About'
import Header from './components/Header'
import Error_500 from './error_Pages/Error_500'
import Error_404 from './error_Pages/Error_404'
import { useAuthStore } from './store/useAuthStore'
import { Loader } from 'lucide-react'
import ProtectedRoute1 from './utils/ProtectedRoute1'
import ProtectedRoute2 from './utils/Protectedroute2'
import CreateListing from './pages/CreateListing'
import EditListing from './pages/EditListing'
import Listing from './pages/Listing'
import Search from './pages/Search'

const App = () => {

  const { verifyToken, isCheckingUser, user } = useAuthStore()

  const navigate = useNavigate()

  useEffect(() =>{
    verifyToken(navigate)
  }, [])

  if(isCheckingUser && !user){
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin' />
      </div>
    )
  }

  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute1 />}>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Route>

        <Route element={<ProtectedRoute2 />}>
          <Route path='/profile/:id' element={<Profile />} />
          <Route path='/create/listing/:id' element={<CreateListing />} />
          <Route path='/edit/listing/:id' element={<EditListing />} />
        </Route>
        
        <Route path='/about' element={<About />} />
        <Route path='/listing/:id' element={<Listing />} />
        <Route path='/search' element={<Search />} />

        <Route path='/500' element={<Error_500 />} />
        <Route path='*' element={<Error_404 />} />
      </Routes>
    </main>
  )
}

export default App