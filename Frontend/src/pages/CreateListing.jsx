import React, { useState } from 'react'
import Input from '../components/Input'
import { useListingStore } from '../store/useListingStore'
import { useNavigate, useParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const CreateListing = () => {

    //Inputs to store Listing Data
    const [listing, setListing] = useState({
        name: '',
        description: '',
        address: '',
        sell: false,
        rent: false,
        parkingSpot: false,
        furnished: false,
        offer: false,
        beds: 1,
        baths: 1,
        price: 0,
        discountPrice: 0
    })
    //Inputs to store Images
    const [images, setImages] = useState([])

    const navigate = useNavigate()

    //User Id
    const { id } = useParams()

    //Store for Managing Listings
    const { createListing, seterror, error, isCreatingListing } = useListingStore()

    //Create Listing Function to validate and divert to Create Listing Api
    function handleCreateListing(event){
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
        if(images.length == 0){
            return seterror("Atleast one Image is Required")
        }

        //Storing in FormData
        const formData = new FormData()
        for(let i in listing){
            formData.append(i, listing[i])
        }
        for(let i of images){
            formData.append("images", i)
        }

        createListing(formData, navigate, id, setListing, setImages)

    }

    //Function to handle Onchange Events
    function handleChange(event){
        const { name, type, value, checked, files } = event.target;

        if(type === 'checkbox'){
            let updatedListing = { ...listing, [name]: checked }

            if (name === "sell" && checked) {
                updatedListing.rent = false // Uncheck rent if sell is checked
            } 
    
            if (name === "rent" && checked) {
                updatedListing.sell = false // Uncheck sell if rent is checked
            }
    
            return setListing(updatedListing)
        }
        if(type === 'file'){
            if(files.length > 6){
                return seterror("Max 6 images allowed!")
            }
            return setImages(files)
        }
        setListing({...listing, [name]: value})
    }

  return (
    <section className='mb-10 sm:px-0 px-5'>
        <h1 className='text-3xl text-center my-10 font-bold '>Create a Listing</h1>
        
        {/* Form to create Listing */}
        <form onSubmit={(event) =>handleCreateListing(event)} className='flex gap-y-7 sm:flex-row flex-col lg:gap-x-20 gap-x-10 mt-5 justify-center'>
            {/* Basic Details */}
            <div className='flex flex-col gap-y-5'>  
                 {/* Name, Description and Address */}
                <Input type={"text"} placeholder={"Name"} id={"name"} name={"name"} value={listing.name} onChange={(event) =>handleChange(event)} error={error == "Name is Required" ? error : ""} />
                <Input type={"textarea"} placeholder={"Description"} id={"description"} name={"description"} value={listing.description} onChange={(event) =>handleChange(event)} error={error == "Description is Required" ? error : ""} />
                <Input type={"text"} placeholder={"Address"} id={"address"} name={"address"} value={listing.address} onChange={(event) =>handleChange(event)} error={error == "Address is Required" ? error : ""} />
                
                {/* Checkbox Inputs */}
                <div className='flex sm:flex-col mt-4 mb-2 gap-y-3 text-sm font-medium'>
                    <div className='flex flex-wrap gap-y-3 gap-x-7'>
                        <Input type={"checkbox"} placeholder={"Sell"} id={"sell"} name={"sell"} value={listing.sell} onChange={(event) =>handleChange(event)} />
                        <Input type={"checkbox"} placeholder={"Rent"} id={"rent"} name={"rent"} value={listing.rent} onChange={(event) =>handleChange(event)} />
                        <Input type={"checkbox"} placeholder={"Parking Spot"} id={"parkingSpot"} name={"parkingSpot"} value={listing.parkingSpot} onChange={(event) =>handleChange(event)} />
                        <Input type={"checkbox"} placeholder={"Furnished"} id={"furnished"} name={"furnished"} value={listing.furnished} onChange={(event) =>handleChange(event)} />
                    </div>
                    <Input type={"checkbox"} placeholder={"Offer"} id={"offer"} name={"offer"} value={listing.offer} onChange={(event) =>handleChange(event)} />
                </div>

                {/* Number Inputs */}
                <div className='flex flex-col gap-y-7'>
                    <div className='flex gap-x-7'>
                        <Input type={"number"} placeholder={"Beds"} id={"beds"} name={"beds"} value={listing.beds} onChange={(event) =>handleChange(event)} />
                        <Input type={"number"} placeholder={"Baths"} id={"baths"} name={"baths"} value={listing.baths} onChange={(event) =>handleChange(event)} />
                    </div>
                    <Input type={"number"} placeholder={"Regular Price"} id={"price"} name={"price"} value={listing.price} onChange={(event) =>handleChange(event)} error={error == "Price is Required" ? error : ""} />
                    {listing.offer && <Input type={"number"} placeholder={"Discounted Price"} id={"discountPrice"} name={"discountPrice"} value={listing.discountPrice} onChange={(event) =>handleChange(event)} error={error == "Discount Price is Required" ? error : ""} />}
                </div>
            </div>

            {/* Image */}
            <div>
                <div className='flex flex-col gap-y-3'>
                    <p className='text-sm'><span className='sm:text-base font-bold'>Images: </span>The first image will be the cover (max 6)</p>
                    <input onChange={(event) =>handleChange(event)} className='border file:bg-gray-100 file:cursor-pointer file:border cursor-pointer file:px-2 file:border-black font-medium text-sm  file:p-1 rounded-md border-slate-200 p-2' multiple type="file" id="image1" name="image1" accept="image/*" />
                    {(error == "Atleast one Image is Required" || error == "Max 6 images allowed!") && <p className='text-red-500 pl-5 mt-[-20px]'>{error}</p>}
                </div>

                <button disabled={isCreatingListing} type='submit' className='bg-slate-700 w-full mt-7 disabled:bg-slate-700/70 hover:bg-slate-700/80 duration-300 font-medium cursor-pointer flex justify-center items-center gap-x-1 text-white py-2 rounded-md'>{isCreatingListing ? <><Loader2 className='animate-spin size-5' />Loading...</> : <div className='uppercase'>Create Listing</div>}</button>
            </div>
        </form>
    </section>
  )
}

export default CreateListing