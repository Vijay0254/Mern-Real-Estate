const express = require("express")
const router = express.Router()

//Path of Controller for API
const { signupController, loginController, GoogleSignUpAndLoginController, logoutController, verifyTokenController, editProfileController } = require('../controller/authController')

//Middleware
const verifyToken = require("../middleware/verifyToken")

//Auth Routes
router.post("/signup", signupController)
router.post("/login", loginController)
router.post("/google", GoogleSignUpAndLoginController)
router.get("/logout", logoutController)
router.get("/verify/token", verifyToken, verifyTokenController)
router.put("/edit/profile/:id", verifyToken, editProfileController)

module.exports = router