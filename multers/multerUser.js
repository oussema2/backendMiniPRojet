const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, `./uploads/userAvatar/`);
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
})


const uploadsUser = multer({ storage: storage });

module.exports = uploadsUser;