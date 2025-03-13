const mongoose = require("mongoose")

const ListingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    sell: {
        type: Boolean,
        default: false
    },
    rent: {
        type: Boolean,
        default: false
    },
    parkingSpot: {
        type: Boolean,
        default: false
    },
    furnished: {
        type: Boolean,
        default: false
    },
    offer: {
        type: Boolean,
        default: false
    },
    beds: {
        type: Number,
        required: true
    },
    baths: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discountPrice: {
        type: Number
    },
    images: {
        type: [String], 
        default: [] 
    }
}, {timestamps: true})

const ListingModel = mongoose.models.Listing || mongoose.model("Listing", ListingSchema)
module.exports = ListingModel