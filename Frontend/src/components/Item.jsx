import { MapPin } from 'lucide-react'
import React from 'react'

const Item = ({ listing }) => {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
        <img className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300' src={listing.images[0] || "../loader.png"} alt="listing Image" />

        <div className='p-4 pt-7 flex flex-col gap-y-2'>
            {/* Name */}
            <h1 className='text-xl truncate font-bold'>{listing.name}</h1>
            {/* Address */}
            <div className="flex pl-1 items-center gap-x-1">
                <MapPin className="size-4 text-green-900" />
                <span className="text-sm">{listing.address}</span>
            </div>
            {/* Description */}
            <p className='text-sm line-clamp-2'>{listing.description}</p>
            {/* Price */}
            <h1 className='font-medium pt-2 text-lg text-slate-500'>${listing.offer ? listing.discountPrice : listing.price}{listing.rent && " / month"}</h1>
            
            {/* Beds and Baths */}
            <div className='flex text-sm items-center gap-x-3 font-medium text-slate-700'>
                <span>{listing.beds} Beds</span>
                <span>{listing.baths} Baths</span>
            </div>
        </div>
    </div>
  )
}

export default Item