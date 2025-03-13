const express = require("express")
const router = express.Router()

//Path of Controller for API
const { createListingController, getUserListingController, deleteListingController, getUserEachListingController, editListingController, getListingWithSearchController } = require("../controller/listingController")

//Middleware
const verifyToken = require("../middleware/verifyToken")
const upload = require("../utils/multer")

//Listing Routes
router.post("/create/:userId", verifyToken, upload.fields([{name: 'images', maxCount: 6}]), createListingController)
router.get("/get/:userId", verifyToken, getUserListingController)
router.delete("/delete/:id", verifyToken, deleteListingController)
router.get("/get/each/:id", getUserEachListingController)
router.put("/edit/:id", verifyToken, editListingController)
router.get("/get", getListingWithSearchController)

module.exports = router