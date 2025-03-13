import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Hero from '../components/Hero'
import Swiperr from '../components/Swiperr'
import { useListingStore } from '../store/useListingStore'
import ListingParts from '../components/ListingParts'

const Home = () => {

  //Store for Managing Listings
  const { fetchListingWithSearch, allListing } = useListingStore()

  const navigate = useNavigate()

  //Store for Each Listings
  const offerListing = {images: allListing?.filter((element) => element.offer)?.flatMap((element) => element.images[0])?.slice(0, 4)}
  const rentListing = allListing?.filter((element) =>element.rent)
  const offerListings = allListing?.filter((element) =>element.offer)
  const sellListings = allListing?.filter((element) =>element.sell)

  useEffect(() =>{
    fetchListingWithSearch(navigate)
  }, [])

  return (
    <section>
      {/* top */}
      <Hero />

      {/* Swiper */}
      <div className='pb-10'>
        <Swiperr listing={offerListing} />
      </div>

      <div className='max-w-6xl px-3 sm:px-5 mx-auto flex flex-col gap-14 my-10'>
        {offerListings?.length > 0 && <ListingParts listings={offerListings} search={'offer'} />}
        {rentListing?.length > 0 && <ListingParts listings={rentListing} search={'rent'} />}
        {sellListings?.length > 0 && <ListingParts listings={sellListings} search={'sell'} />}
      </div>
    </section>
  )
}

export default Home