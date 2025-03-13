import { create } from "zustand";
import { Axios } from "../utils/Axios";
import { handleError } from "../utils/handleError";
import toast from "react-hot-toast";

//This store is used to manage user Listing
export const useListingStore = create((set, get) =>({
    listings: null,
    listing: null,
    allListing: null,
    error: null,
    isCreatingListing: false,
    isFetchingListing: false,
    isDeletingListing: false,
    isFetchingEachListing: false,
    isSearching: false,

    seterror: (error) =>{
        set({ error: error })
    },

    createListing: async(formData, navigate, id, setListing, setImages) =>{
        set({ isCreatingListing: true })
        const { seterror } = get()
        try{
            const response = await Axios.post(`/api/listing/create/${id}`, formData)
            if(response.data.success){
                set({ error: null })
                toast.success("Listing Created")
                //Reseting Every Input
                setListing({
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
                setImages([])
            }
        }
        catch(err){
            handleError(err, seterror, navigate)
            console.log(`Error in Create Listing - ${err.message}`)
        }
        finally{
            set({ isCreatingListing: false })
        }
    },

    fetchListings: async(id, navigate) =>{
        set({ isFetchingListing: true })
        const { seterror } = get()
        try{
            const response = await Axios.get(`/api/listing/get/${id}`)
            if(response.data.success){
                set({ listings: response.data.listings })
            }
        }
        catch(err){
            handleError(err, seterror, navigate)
            console.log(`Error in Fetch Listing - ${err.message}`)
        }
        finally{
            set({ isFetchingListing: false })
        }
    },

    deleteListing: async(id, navigate) =>{
        set({ isDeletingListing: id })
        const { seterror } = get()
        try{
            const response = await Axios.delete(`/api/listing/delete/${id}`)
            if(response.data.success){
                toast.success("Listing Deleted")
            }
        }
        catch(err){
            handleError(err, seterror, navigate)
            console.log(`Error in Delete Listing - ${err.message}`)
        }
        finally{
            set({ isDeletingListing: false })
        }
    },

    fetchEachListing: async(id, navigate) =>{
        set({ isFetchingEachListing: true })
        const { seterror } = get()
        try{
            const response = await Axios.get(`/api/listing/get/each/${id}`)
            if(response.data.success){
                // console.log(response.data)
                set({ listing: response.data.eachListing })
            }
        }
        catch(err){
            handleError(err, seterror, navigate)
            console.log(`Error in Fetch Each Listing - ${err.message}`)
        }
        finally{
            set({ isFetchingEachListing: false })
        }
    },

    editListing: async(navigate, id, listing) =>{
        set({ isEditingListing: true })
        const { seterror } = get()
        try{
            const response = await Axios.put(`/api/listing/edit/${id}`, listing)
            if(response.data.success){
                toast.success("Listing Updated")
            }
        }
        catch(err){
            handleError(err, seterror, navigate)
            console.log(`Error in Edit Listing - ${err.message}`)
        }
        finally{
            set({ isEditingListing: false })
        }
    },

    handleChange: (event) =>{
        const { listing } = get()
        const { name, type, value, checked } = event.target
        if(type === 'checkbox'){
            let updatedListing = { ...listing, [name]: checked }

            if (name === "sell" && checked) {
                updatedListing.rent = false // Uncheck rent if sell is checked
            } 
    
            if (name === "rent" && checked) {
                updatedListing.sell = false // Uncheck sell if rent is checked
            }
    
            return set({ listing: updatedListing })
        }
        set({ listing: {...listing, [name]: value} })
    },
    
    fetchListingWithSearch: async(navigate, searchTerm) =>{
        set({ isSearching: true })
        const { seterror } = get()
        try{
            const response = await Axios.get(`/api/listing/get?${searchTerm}`)
            if(response.data.success){
                set({ allListing: response.data.allListing })
            }
        }
        catch(err){
            handleError(err, seterror, navigate)
            console.log(`Error in Edit Listing - ${err.message}`)
        }
        finally{
            set({ isSearching: false })
        }
    }
}))