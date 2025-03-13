import React from 'react'
import Item from './Item'
import { Loader2 } from 'lucide-react'

const Results = ({ allListing, isSearching }) => {
  return (
    <div className='py-5 pb-10 sm:pb-0 sm:py-10 sm:px-0 px-7'>
        <h1 className='pb-10 text-3xl font-bold text-slate-700'>Listing results:</h1>
        {!isSearching ?
          <div className='flex sm:flex-row flex-col flex-wrap gap-x-12 gap-y-12'>
              {allListing?.map((element, index) =>(
                  <Item key={index} listing={element} />
              ))}
          </div> :
          <div className='flex gap-x-2 items-center justify-center'>
            <Loader2 className='animate-spin' />
            <span className='font-medium text-lg'>Loading...</span>
          </div>
        }
    </div>
  )
}

export default Results