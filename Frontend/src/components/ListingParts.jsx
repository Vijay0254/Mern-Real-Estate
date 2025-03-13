import React from 'react'
import Item from './Item'
import { Link } from 'react-router-dom'

const ListingParts = ({ listings, search }) => {
  return (
    <div className=''>
        <div className='my-3'>
            <h2 className='text-2xl font-semibold text-slate-600'>{search == "offer" ? "Recent Offers" : `Recent places for ${search}`}</h2>
            <Link className='text-sm text-blue-800 hover:underline' to={`/search?${search}=true`}>{search == "offer" ? "Show more offers" : `Show more places for ${search}`}</Link>
        </div>
        <div className='flex justify-evenly flex-wrap gap-4'>
            {listings.map((element) => (
                <Item listing={element} key={element._id} />
            ))}
        </div>
    </div>
  )
}

export default ListingParts