const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads')
    },
    filename: (req, file, callback) => {

        const filename = `image-${Date.now()}-${file.originalname}`
        callback(null, filename)
    }
})

const filefilter = (req, file, callback) => {
    if (file.mimetype == 'image/png' || file.mimetype == 'img/jpg' || file.mimetype == 'img/jpeg') {
        callback(null, true)
    } else {
        callback(null, false)
        return callback(new Error('Only png,jpg and jpeg files are accepted'))
    }
}
// multer configuration
const multerConfig = multer({
    storage,
    filefilter
})
module.exports = multerConfig