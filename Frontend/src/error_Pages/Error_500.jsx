import { TriangleAlert } from 'lucide-react';
import React from 'react'

const Error_500 = () => {
  return (
    <section className='flex gap-y-1 mt-32 md:gap-y-4 justify-center items-center flex-col'>
        <div className='bg-white flex justify-center gap-3 flex-col items-center xl:p-20 p-4 md:p-20 rounded'>
            <div className='flex flex-row-reverse font-playfair gap-4 md:gap-6 items-center text-5xl sm:text-8xl font-bold text-slate-600'>
                <h1 className=''>Error 500</h1>
                <TriangleAlert className='size-10 sm:size-20' />
            </div>
            <h3 className='text-3xl sm:text-6xl font-bold font-playfair text-slate-500'>Internal Server Error</h3>
        </div>
</section>
  )
}

export default Error_500