const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel')

//For Verifying Token
const verifyToken = (req, res, next) =>{
    const token = req?.cookies["real-estate"]
    if(token){
        jwt.verify(token, process.env.JWT_SECRET_KEY, async(err, decoded) =>{
            try{
                if(err){
                    return res.status(401).json({message: "Token not Valid", success: false, error: "Invalid Credentials"})
                }
                else{
                    const user = await UserModel.findById({_id: decoded.id}).select("-password")
                    req.user = user
                    next()
                }
            }
            catch(err){
                console.log(`Error in User Verify Token - ${err.message}`)
                return res.status(500).json({message: 'Internal Server Error'})
            }
        })
    }
    else{
        return res.status(401).json({message: "Token Timed Out", success: false, error: "Invalid Credentials"})
    }
}

module.exports = verifyToken