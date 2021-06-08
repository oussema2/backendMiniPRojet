const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, `./uploads/tournamentPhoto/`);
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
})


const uploadsTournament = multer({ storage: storage });

module.exports = uploadsTournament;