const UserModel = require("../models/UserModel")
const bcrypt = require("bcrypt")
const generateToken = require("../utils/generateToken")

//Controller for User to Signup
const signupController = async(req, res) =>{
    try{
        const { username, email, password } = req.body

        const exist = await UserModel.findOne({email: email})
        if(exist){
            return res.status(409).json({success: false, error: "Email already Registered"})
        }
        
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = UserModel({
            username: username,
            email: email,
            password: hashedPassword,
        })
        generateToken(newUser._id, res)
        const {password: pass, ...user} = newUser._doc
        await newUser.save()
        return res.status(200).json({success: true, user: user, message: "Signup Success"})
    }
    catch(err){
        console.log(`Error in Sign Up Controller - ${err.message}`)
        return res.status(500).json({message: 'Internal Server Error', error: err.message})
    }
}

//Controller for User to Login
const loginController = async(req, res) =>{
    try{
        const { email, password } = req.body

        const exist = await UserModel.findOne({email: email})
        if(!exist){
            return res.status(409).json({success: false, error: "Email is not Registered"})
        }

        const verifyPassword = await bcrypt.compare(password, exist.password)
        if(!verifyPassword){
            return res.status(401).json({success: false, error: "Password is Wrong"})
        }

        generateToken(exist.id, res)
        const {password: pass, ...user} = exist._doc
        return res.status(200).json({success: true, message: "Login Success", user: user})
    }
    catch(err){
        console.log(`Error in Login Controller - ${err.message}`)
        return res.status(500).json({message: 'Internal Server Error', error: err.message})
    }
}

//Controller for User to Login via Google
const GoogleSignUpAndLoginController = async(req, res) =>{
    try{
        const { username, email, password } = req.body

        const exist = await UserModel.findOne({email: email})
        if(exist){
            generateToken(exist.id, res)
            const {password: pass, ...user} = exist._doc
            return res.status(200).json({success: true, message: "Login Success", user: user})
        }
        
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = UserModel({
            username: username,
            email: email,
            password: hashedPassword,
        })
        generateToken(newUser._id, res)
        const {password: pass, ...user} = newUser._doc
        await newUser.save()
        return res.status(200).json({success: true, user: user, message: "Signup Success"})
    }
    catch(err){
        console.log(`Error in Sign Up Controller - ${err.message}`)
        return res.status(500).json({message: 'Internal Server Error', error: err.message})
    }
}

//Controller for User to Logout
const logoutController = async(req, res) =>{
    try{
        res.clearCookie("real-estate")
        return res.status(200).json({success: true, message: "Logout Success"})
    }
    catch(err){
        console.log(`Error in Logout Controller - ${err.message}`)
        return res.status(500).json({message: 'Internal Server Error', error: err.message})
    }
}

//Controller to verify User Token
const verifyTokenController = async(req, res) =>{
    try{
        return res.status(200).json({success: true, user: req.user})
    }
    catch(err){
        console.log(`Error in Verify Token Controller - ${err.message}`)
        return res.status(500).json({message: 'Internal Server Error', error: err.message})
    }
}

//Controller to Edit User Profile
const editProfileController = async(req, res) =>{
    try{
        const { username, currentPassword, newPassword } = req.body
        const { id } = req.params

        const exist = await UserModel.findOne({email: req.user.email})
        if(currentPassword && newPassword){
            const verifyPassword = await bcrypt.compare(currentPassword, exist.password)
            if(!verifyPassword){
                return res.status(401).json({success: false, error: "Password is wrong"})
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10)
            await UserModel.findByIdAndUpdate(id,{
                password: hashedPassword
            }, {new: true})
        }

       
        await UserModel.findByIdAndUpdate(id,{
            username: username
        }, {new: true})

        return res.status(200).json({success: true, message: "Profile Updated"})
    }
    catch(err){
        console.log(`Error in Verify Token Controller - ${err.message}`)
        return res.status(500).json({message: 'Internal Server Error', error: err.message})
    }
}

module.exports = { signupController, loginController, GoogleSignUpAndLoginController, logoutController, verifyTokenController, editProfileController }