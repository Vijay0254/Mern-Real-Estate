const ListingModel = require("../models/ListingModel")
const cloudinary = require("cloudinary")

//Controller to Create Listing
const createListingController = async(req, res) =>{
    try{
        const { name, description, address, sell, rent, parkingSpot, furnished, offer, beds, baths, price, discountPrice } = req.body
        const { userId } = req.params

        let images = []
        // Ensure req.files.images exists and is an array
        if (req?.files?.images && Array.isArray(req.files.images)) {
            // Loop through each image and upload it
            for (const image of req.files.images) {
                const result = await cloudinary.v2.uploader.upload(image.path, { resource_type: 'image' })
                images.push(result.secure_url)
            }
        }

        const newListing = ListingModel({
            userId: userId,
            name: name,
            description: description,
            address: address,
            sell: sell == "true" ? true : false,
            rent: rent == "true" ? true : false,
            parkingSpot: parkingSpot == "true" ? true : false,
            furnished: furnished == "true" ? true : false,
            offer: offer == "true" ? true : false,
            beds: Number(beds),
            baths: Number(baths),
            price: Number(price),
            discountPrice: Number(discountPrice),
            images: images
        })

        await newListing.save()
        return res.status(200).json({success: true, message: "Listing Created"})
    }
    catch(err){
        console.log(`Error in Create Listing Controller - ${err.message}`)
        return res.status(500).json({message: 'Internal Server Error', error: err.message})
    }
}

//Controller to Get Listing
const getUserListingController = async(req, res) =>{
    try{
        const { userId } = req.params
        const listings = await ListingModel.find({ userId: userId })
        return res.status(200).json({success: true, listings: listings})
    }
    catch(err){
        console.log(`Error in Get User Listing Controller - ${err.message}`)
        return res.status(500).json({message: 'Internal Server Error', error: err.message})
    }
}

//Controller to Delete Listing
const deleteListingController = async(req, res) =>{
    try{
        const { id } = req.params

        //For Deleting Image of Listing from Cloudinary
        const listings = await ListingModel.findById({_id: id})

        for(let image of listings.images){
            const imageURL = image.split("/").pop().split(".")[0]
            await cloudinary.v2.uploader.destroy(imageURL)
        }

        await ListingModel.findByIdAndDelete(id)
        return res.status(200).json({success: true, message: "Listing Deleted"})
    }
    catch(err){
        console.log(`Error in Delete Listing Controller - ${err.message}`)
        return res.status(500).json({message: 'Internal Server Error', error: err.message})
    }
}

//Controller to Get Each Listing
const getUserEachListingController = async(req, res) =>{
    try{
        const { id } = req.params
        const eachListing = await ListingModel.findById({_id: id}).populate({
            path: "userId",
            select: "-password"
        })
        return res.status(200).json({success: true, eachListing: eachListing})
    }
    catch(err){
        console.log(`Error in Get User Listing Controller - ${err.message}`)
        return res.status(500).json({message: 'Internal Server Error', error: err.message})
    }
}

//Controller to Get All Listing with also Searching Function
const getListingWithSearchController = async(req, res) =>{
    try{
        const limit = parseInt(req.query.limit) || 9
        const startIndex = parseInt(req.query.startIndex) || 0

        let offer = req.query.offer
        if(offer == undefined || offer == false || offer == "false"){
            offer = {$in: [false, true]}
        }

        let furnished = req.query.furnished
        if(furnished == undefined || furnished == false || furnished == "false"){
            furnished = {$in: [false, true]}
        }

        let parkingSpot = req.query.parkingSpot
        if(parkingSpot == undefined || parkingSpot == false || parkingSpot == "false"){
            parkingSpot = {$in: [false, true]}
        }

        let rent = req.query.rent
        if(rent == undefined || rent == false || rent == "false"){
            rent = {$in: [false, true]}
        }

        let sell = req.query.sell
        if(sell == undefined || sell == false || sell == "false"){
            sell = {$in: [false, true]}
        }

        const searchTerm = req.query.searchTerm || ''
        const sort = req.query.sort || 'createdAt'
        const order = req.query.order == 'desc' ? -1 : 1

        const allListing = await ListingModel.find({
            name: { $regex: searchTerm, $options: 'i' },
            offer: offer,
            furnished: furnished,
            parkingSpot: parkingSpot,
            rent: rent,
            sell: sell
        }).sort({[sort]: order})

        return res.status(200).json({success: true, allListing: allListing})
    }
    catch(err){
        console.log(`Error in Get Listing with Search Controller - ${err.message}`)
        return res.status(500).json({message: 'Internal Server Error', error: err.message})
    }
}

//Controller to Edit Listing
const editListingController = async(req, res) =>{
    try{
        const { id } = req.params
        const { name, description, address, sell, rent, parkingSpot, furnished, offer, beds, baths, price, discountPrice } = req.body

        await ListingModel.findByIdAndUpdate(id, {
            name: name,
            description: description,
            address: address,
            sell: sell,
            rent: rent,
            parkingSpot: parkingSpot,
            furnished: furnished,
            offer: offer,
            beds: Number(beds),
            baths: Number(baths),
            price: Number(price),
            discountPrice: Number(discountPrice)
        }, {new: true})
        return res.status(200).json({success: true, message: "Listing Updated"})
    }
    catch(err){
        console.log(`Error in Edit Listing Controller - ${err.message}`)
        return res.status(500).json({message: 'Internal Server Error', error: err.message})
    }
}

module.exports = { createListingController, getUserListingController, deleteListingController, editListingController, getUserEachListingController, getListingWithSearchController }