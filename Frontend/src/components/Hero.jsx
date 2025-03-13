import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='flex flex-col gap-6 max-w-6xl px-3 sm:px-5 mx-auto p-5 py-10 sm:p-28'>
        <h1 className='text-slate-700 font-bold text-3xl sm:text-6xl'>Find your next <span className='text-slate-500'>perfect</span>
        <br />
        place with ease
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
        Sahand Estate is the best place to find your next perfect place tolive.
        <br />
        We have a wide range of properties for you to choose from.
        </div>
        <Link to={'/search'} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>Let's get started...</Link>
    </div>
  )
}

export default Hero