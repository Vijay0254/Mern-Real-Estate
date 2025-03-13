import React, { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import ProfilePic from './ProfilePic'

const Header = () => {

    //Store to Manage User Authentication
    const { user } = useAuthStore()

    //Input to store Search 
    const [searchTerm, setsearchTerm] = useState("")

    const navigate = useNavigate()

    //Function to Add Query to URL
    function handleSearchValue(){
        const urlParams = new URLSearchParams(window.location.search)
        urlParams.set("searchTerm", searchTerm)
        const searchQuery = urlParams.toString()
        navigate(`/search?${searchQuery}`)
    }

    //Function to add search term in input box when changes made in URL
    useEffect(() =>{
        const urlParams = new URLSearchParams(location.search)
        const searchTermFromUrl = urlParams.get("searchTerm")
        if(searchTermFromUrl){
            setsearchTerm(searchTermFromUrl)
        }
    }, [location.search])

  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='flex max-w-6xl px-3 sm:px-5 mx-auto justify-between items-center py-4'>
            {/* Name */}
            <Link to={'/'} className='sm:text-lg font-bold text-gray-500'>Sahand<span className='text-black'>Estate</span></Link>

            {/* Search */}
            <div className='relative'>
                <input value={searchTerm} onChange={(event) =>setsearchTerm(event.target.value)} className='search-inp' type="text" placeholder='Search...' name='search' id='search' />
                <Search onClick={() =>handleSearchValue()} className='size-4 cursor-pointer absolute right-2 top-2 sm:top-3' />
            </div>

            {/* Navigation */}
            <nav className='flex items-center gap-x-5'>
                <NavLink className={(({isActive}) =>isActive ? "text-slate-500 font-bold sm:block hidden" : "text-black font-bold sm:block hidden")} to={'/'}>Home</NavLink>
                <NavLink className={(({isActive}) =>isActive ? "text-slate-500 font-bold sm:block hidden" : "text-black font-bold sm:block hidden")} to={'/about'}>About</NavLink>
                <NavLink className={(({isActive}) =>isActive ? "text-slate-500 font-bold" : "text-black font-bold")} to={user ? `/profile/${user?._id}` : "/login"}>{user ? <ProfilePic user={user} width="10" /> : "Login"}</NavLink>
            </nav>
        </div>
    </header>
  )
}

export default Header