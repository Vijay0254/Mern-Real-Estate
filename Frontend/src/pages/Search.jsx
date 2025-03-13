import React, { useEffect, useState } from 'react'
import Filters from '../components/Filters'
import Results from '../components/Results'
import { useNavigate } from 'react-router-dom'
import { useListingStore } from '../store/useListingStore'

const Search = () => {

    const navigate = useNavigate()

    const urlParams = new URLSearchParams(location.search);
    const searchTerm = urlParams.toString()

    const [searchQuery, setsearchQuery] = useState({
      rent: false,
      sell: false,
      offer: false,
      parkingSpot: false,
      furnished: false,
      sort: "createdAt",
      order: 'dgesc'
    })

    const { fetchListingWithSearch, allListing, isSearching } = useListingStore()

    useEffect(() =>{
      fetchListingWithSearch(navigate, searchTerm)
    }, [searchTerm])

  return (
    <section className='flex gap-x-10 sm:flex-row flex-col gap-y-10'>
        <div className='relative sm:min-h-screen'>
            <Filters searchTerm={urlParams.get("searchTerm")} searchQuery={searchQuery} setsearchQuery={setsearchQuery} fetchListingWithSearch={fetchListingWithSearch} navigate={navigate} />
        </div>

        <div className=''>
            <Results allListing={allListing} isSearching={isSearching} />
        </div>
    </section>
  )
}

export default Search