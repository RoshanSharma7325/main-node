const multer = require('multer')
const path = require("path")

const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + path.extname(file.originalname))
  }
})

const fileFilter = (req, file, cb) => {
  const filetypes = /jpg|jpeg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimtype = filetypes.test(file.mimetype)


  if (mimtype && extname) {
    return cb(null, true)
  } else {     
    const error = {
      massage:"Invalid file"
    }
    cb(error)
    //  cb("Error: Images Only")
  }
}


const upload = multer({
  storage: storage,
  limits: { fieldSize: 10000000 },
  fileFilter: fileFilter
})


module.exports = upload

