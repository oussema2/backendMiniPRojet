const router = require('express').Router();
const GameType = require('../models/gameType.model');



router.route('/').get((req, res) => {
    GameType.find()
        .then((data) => res.json(data))
        .catch((err) => res.json("Error :" + err))

});

router.route('/add').post((req, res) => {

    const nameType = req.body.nameType;

    const newGameType = new GameType({ nameType });
    newGameType.save()
        .then(() => res.json('added'))
        .catch((err) => res.json("Error :" + err))
})

module.exports = router;