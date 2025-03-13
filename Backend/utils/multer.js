const multer = require('multer')

//Function to create File name for image
const storage = multer.diskStorage({
    filename: (req, file, cb) =>{
        cb(null, file.originalname)
    }
})

const upload = multer({storage: storage})
module.exports = upload