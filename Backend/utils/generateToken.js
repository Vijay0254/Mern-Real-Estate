const jwt = require("jsonwebtoken")

//To Generate JWT Token
const generateToken = (id, res) =>{
    const token = jwt.sign({id: id}, process.env.JWT_SECRET_KEY, {expiresIn: "5d"})
   
    res.cookie("real-estate", token, {
        maxAge: 432000000,
        httpOnly: true, //Prevents XSS Attack cross-site scripting attacks
        sameSite: "strict", //CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development"
    })

    return token
}

module.exports = generateToken