import React, { useEffect, useState } from 'react'
import Input from '../components/Input'
import { useListingStore } from '../store/useListingStore'
import { useNavigate, useParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const EditListing = () => {

    const navigate = useNavigate()

    //Listing Id
    const { id } = useParams()

    //Store for Managing Listings
    const { listing, fetchEachListing, seterror, error, isFetchingEachListing, editListing, isEditingListing, handleChange } = useListingStore()

    //Create Listing Function to validate and divert to Create Listing Api
    function handleEditListing(event){
        event.preventDefault()
        if(!listing.name || !listing.description || !listing.address || listing.price == 0){
            if(!listing.name){
                return seterror("Name is Required")
            }
            if(!listing.description){
                return seterror("Description is Required")
            }
            if(!listing.address){
                return seterror("Address is Required")
            }
            if(listing.price == 0){
                return seterror("Price is Required")
            }
        }
        if(listing.offer && listing.discountPrice == 0){
            return seterror("Discount Price is Required")
        }

        editListing(navigate, id, listing)
    }

    useEffect(() =>{
        fetchEachListing(id, navigate)
    }, [])

  return (
    <section className='mb-10 flex flex-col justify-center items-center  sm:px-0 px-5'>
        <h1 className='text-3xl text-center my-10 font-bold '>Edit Listing</h1>

        {/* Form to create Listing */}
        {!isFetchingEachListing ?
            <form onSubmit={(event) =>handleEditListing(event)} className='flex gap-y-7 w-[300px] sm:w-[450px] flex-col lg:gap-x-20 gap-x-10 mt-5 justify-center'>
                {/* Basic Details */}
                <div className='flex flex-col gap-y-5'>  
                    {/* Name, Description and Address */}
                    <Input type={"text"} placeholder={"Name"} id={"name"} name={"name"} value={listing?.name} onChange={(event) =>handleChange(event)} error={error == "Name is Required" ? error : ""} />
                    <Input type={"textarea"} placeholder={"Description"} id={"description"} name={"description"} value={listing?.description} onChange={(event) =>handleChange(event)} error={error == "Description is Required" ? error : ""} />
                    <Input type={"text"} placeholder={"Address"} id={"address"} name={"address"} value={listing?.address} onChange={(event) =>handleChange(event)} error={error == "Address is Required" ? error : ""} />
                    
                    {/* Checkbox Inputs */}
                    <div className='flex sm:flex-col mt-4 mb-2 gap-y-3 text-sm font-medium'>
                        <div className='flex flex-wrap gap-y-3 gap-x-7'>
                            <Input type={"checkbox"} placeholder={"Sell"} id={"sell"} name={"sell"} value={listing?.sell} onChange={(event) =>handleChange(event)} />
                            <Input type={"checkbox"} placeholder={"Rent"} id={"rent"} name={"rent"} value={listing?.rent} onChange={(event) =>handleChange(event)} />
                            <Input type={"checkbox"} placeholder={"Parking Spot"} id={"parkingSpot"} name={"parkingSpot"} value={listing?.parkingSpot} onChange={(event) =>handleChange(event)} />
                            <Input type={"checkbox"} placeholder={"Furnished"} id={"furnished"} name={"furnished"} value={listing?.furnished} onChange={(event) =>handleChange(event)} />
                        </div>
                        <Input type={"checkbox"} placeholder={"Offer"} id={"offer"} name={"offer"} value={listing?.offer} onChange={(event) =>handleChange(event)} />
                    </div>

                    {/* Number Inputs */}
                    <div className='flex flex-col gap-y-7'>
                        <div className='flex gap-x-7'>
                            <Input type={"number"} placeholder={"Beds"} id={"beds"} name={"beds"} value={listing?.beds} onChange={(event) =>handleChange(event)} />
                            <Input type={"number"} placeholder={"Baths"} id={"baths"} name={"baths"} value={listing?.baths} onChange={(event) =>handleChange(event)} />
                        </div>
                        <Input type={"number"} placeholder={"Regular Price"} id={"price"} name={"price"} value={listing?.price} onChange={(event) =>handleChange(event)} error={error == "Price is Required" ? error : ""} />
                        {listing?.offer && <Input type={"number"} placeholder={"Discounted Price"} id={"discountPrice"} name={"discountPrice"} value={listing?.discountPrice} onChange={(event) =>handleChange(event)} error={error == "Discount Price is Required" ? error : ""} />}
                    </div>
                </div>

                <div>
                    <button disabled={isEditingListing} type='submit' className='bg-slate-700 w-full mt-7 disabled:bg-slate-700/70 hover:bg-slate-700/80 duration-300 font-medium cursor-pointer flex justify-center items-center gap-x-1 text-white py-2 rounded-md'>{isEditingListing ? <><Loader2 className='animate-spin size-5' />Loading...</> : <div className='uppercase'>Update Listing</div>}</button>
                </div>
            </form> :
            <div className='flex mt-6 gap-x-2 items-center justify-center'>
                <Loader2 className='animate-spin size-10' />
                <span className='font-medium text-4xl'>Loading...</span>
            </div>            
        }
    </section>
  )
}

export default EditListing