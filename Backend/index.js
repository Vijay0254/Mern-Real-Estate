const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT

//Path of Database
const connectDb = require('./db/connectDb')

//Path of Cloudinary
const connectCloudinary = require('./utils/connectCloudinary')

//Path of Router for API
const authRouter = require("./router/authRouter")
const listingRouter = require("./router/listingRouter") 

//Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//API
app.use("/api/auth", authRouter)
app.use("/api/listing", listingRouter)

//For Connecting to Port
app.listen(PORT, (err) =>{
    err ? console.log(`Error in Running Server - ${err.message}`) : console.log(`Server Running Successfully`)
    connectDb()
    connectCloudinary()
})