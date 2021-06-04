const multer = require('multer')
const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

const storage = (filePath) => {
  const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, filePath)
    },
    filename: (req, file, cb) => {
      const originalFileExt = file.originalname.split('.')
      const fileExt = originalFileExt[originalFileExt.length - 1].toLowerCase()
      const cryptoByte = crypto.randomBytes(6).toString('hex')
      cb(null, `${req.user._id}-${cryptoByte}.${fileExt}`)        
    }
  })
  return fileStorage
}

const IMAGE_ONLY_FILTER = (req, file, cb) => {
  if(
    file.mimetype === 'image/jpeg' || 
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/gif' ||
    file.mimetype === 'image/svg') {
    cb(null, true)
  }
  else{
    cb(null, false)
  }
}

exports.UPLOAD_PROFILE_PHOTO = multer({ 
  storage: storage('public/users'), 
  fileFilter : IMAGE_ONLY_FILTER, 
  limits: {
    fileSize: 532480
}}).single('photo')

exports.DELETE_PHOTO = (photoLink) => {
  const photoPath = path.join(__dirname, '..')
  return fs.unlink(photoPath+'/'+photoLink, (err) => {
    if(err) {
      return 'Error: '+err.message
    }
    console.log('photo updated')
  })
}
