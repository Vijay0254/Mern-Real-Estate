import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import { useListingStore } from '../store/useListingStore'
import { Bath, Bed, BedDouble, Loader2, MapPin, SquareParking } from 'lucide-react'
import { useAuthStore } from "../store/useAuthStore";
import Swiperr from "../components/Swiperr";

const Listing = () => {

    //Listing Id
    const { id } = useParams()

    const navigate = useNavigate()

    //Store for Managing User Auth
    const { user } = useAuthStore()

    //Store for Managing Listing
    const { fetchEachListing, isFetchingEachListing, listing } = useListingStore()

    //Inputs for Contact
    const [activateContact, setactivateContact] = useState(false)
    const [message, setmessage] = useState("")

    //Function to handle Contact Button
    function handleContact(){
        if(activateContact === false){
            setactivateContact(true)
        }
        else{
            window.location.href = `mailto:${listing?.userId?.email}?subject=Regarding ${encodeURIComponent(listing?.name)}&body=${encodeURIComponent(message)}`;
        }
    }

    useEffect(() =>{
        fetchEachListing(id, navigate)
    }, [])

  return (
    <section>
        {!isFetchingEachListing ? 
            <div>
                {/* Images */}
                <Swiperr listing={listing} />

                <div className="my-14 flex flex-col justify-center items-center">
                    <div className="w-[90%] sm:w-[75%]">
                        {/* Name and Price */}
                        <h1 className="text-3xl font-bold">{listing?.name} - ${listing?.offer ? listing?.discountPrice : listing?.price} {listing?.rent && "/ month"}</h1>
                        {/* Address */}
                        <p className="mt-7 mb-1 flex items-center gap-x-1"><MapPin className="size-4 text-green-900" /><span className="text-sm font-medium">{listing?.address}</span></p>
                        {/* Rent, Sale and Discount */}
                        <div className="flex my-4 items-center gap-x-4">
                            <span className="text-white rounded-md font-medium bg-red-900 py-1.5 px-7">For {listing?.rent ? "Rent" : "Sale"}</span>
                            {!listing?.offer && <span className="text-white rounded-md font-medium bg-green-900 py-1.5 px-7">${listing?.price - listing?.discountPrice} discount</span>}
                        </div>

                        {/* Description */}
                        <p className="font-bold mb-4 text-[17px]">Description - <span className="text-base font-medium">{listing?.description}</span></p>

                        {/* Beds, Baths, Parking and Furnished */}
                        <div className="flex items-center flex-wrap gap-x-7 gap-y-5">
                            <div className="flex text-green-900 text-sm font-bold items-center gap-x-1">
                                <Bed className="size-4 text-green-900" />
                                <span>{listing?.beds} {listing?.beds > 1 ? "Beds" : "Bed"}</span>
                            </div>
                            <div className="flex text-green-900 text-sm font-bold items-center gap-x-1">
                                <Bath className="size-4 text-green-900" />
                                <span>{listing?.baths} {listing?.baths > 1 ? "Baths" : "Bath"}</span>
                            </div>
                            <div className="flex text-green-900 text-sm font-bold items-center gap-x-1">
                                <SquareParking className="size-4 text-green-900" />
                                <span>{listing?.parkingSpot ? "Parking" : "No Parking"}</span>
                            </div>
                            <div className="flex text-green-900 text-sm font-bold items-center gap-x-1">
                                <BedDouble className="size-4 text-green-900" />
                                <span>{listing?.furnished ? "Furnished" : "Not Furnished"}</span>
                            </div>
                        </div>

                        {/* Contact */}
                        {activateContact && 
                            <div className="pt-7">
                                <p className="font-medium">Contact <span className="font-bold">{listing?.userId?.username}</span> for <span className="font-bold">{listing?.name}</span></p>
                                <textarea value={message} onChange={(event) =>setmessage(event.target.value)} placeholder="Enter your message here..." rows={3} className="outline-blue-300 border w-full bg-white rounded-md p-3 border-slate-300 mt-2" name="contact" id="contact"></textarea>
                            </div>
                        }
                        {user?._id !== listing?.userId?._id && <button onClick={() =>handleContact()} className={`bg-slate-700 w-full ${activateContact ? "mt-2" : "mt-10"} disabled:bg-slate-700/70 hover:bg-slate-700/80 duration-300 font-medium cursor-pointer flex justify-center items-center gap-x-2 text-white uppercase py-3 rounded-md`}>{activateContact ? "Send Message" : "Contact Landload"}</button>}
                    </div>
                </div>
            </div> :
            <div className='flex mt-20 gap-x-2 items-center justify-center'>
                <Loader2 className='animate-spin sm:size-10' />
                <span className='font-medium sm:text-4xl'>Loading...</span>
            </div>  
        }
    </section>
  )
}

export default Listing