import React, { useEffect } from 'react'
import { useListingStore } from '../store/useListingStore'
import { Loader2 } from 'lucide-react'

const Listings = ({ id, navigate }) => {

    //Store to Manage Listing
    const { isFetchingListing, listings, fetchListings, isDeletingListing, deleteListing } = useListingStore()

    useEffect(() =>{
        fetchListings(id, navigate)
    }, [isDeletingListing])

  return (
    <section>
        <h1 className='text-3xl my-5 mb-10 text-center font-bold '>Your listings</h1>  

        {!isFetchingListing ?
            <div className='w-[300px] flex flex-col gap-y-5 sm:w-[450px]'>
                {listings?.map((element) =>(
                    <div className='flex gap-x-5 justify-between items-center p-3 border border-slate-300/70 rounded-md' key={element._id}>
                        <div className='flex items-center gap-x-2'>
                            <img className='w-28 h-14' src={element.images[0] || "../loader.png"} alt="listingImg" />
                            <h1 className='sm:text-base text-sm font-bold'>{element.name}</h1>
                        </div>   
                        <div className='flex flex-col gap-y-0.5'>
                            <button onClick={() =>deleteListing(element._id, navigate)} className='uppercase cursor-pointer font-medium text-red-500 flex justify-center items-center'>{(isDeletingListing && isDeletingListing == element._id) ? <Loader2 className='animate-spin size-4' /> : "Delete"}</button>
                            <button onClick={() =>navigate(`/edit/listing/${element._id}`)} className='uppercase cursor-pointer font-medium text-green-700'>Edit</button>
                        </div>
                    </div>
                ))}
            </div> : 
            <div className='flex gap-x-2 items-center justify-center'>
                <Loader2 className='animate-spin' />
                <span className='font-medium text-lg'>Loading...</span>
            </div>
        }
    </section>
  )
}

export default Listings