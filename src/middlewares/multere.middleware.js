import multer from "multer";
const multerMiddleware = require('../middlewares/multer.middleware');



// he disk storage engine gives you full control on storing files to disk.

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,"./public/temp" )
  },
  filename: function (req, file, cb) {
    
    cb(null, file.originalname)
  }
})

export const upload = multer({ 
    storage,
 })