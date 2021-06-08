const router = require('express').Router();
let Game = require('../models/game.model');





router.route('/').get((req, res) => {
    Game.find()
        .then((games) => res.json(games))
        .catch((err) => res.json("Error :" + err))

});

router.route('/home').get((req, res) => {
    Game.find().sort({ tournamentNumber: 1 }).limit(3)
        .then((games) => res.json(games))
        .catch((err) => res.json("Error :" + err))

});


router.route('/add').post((req, res) => {
    const gameName = req.body.gameName;
    const gameType = req.body.gameType;
    const gamePhoto = req.body.gamePhoto;

    const newGame = new Game({ gameName, gameType, gamePhoto })
    newGame.save()
        .then(() => res.json("Added"))
        .catch((err) => res.json("Erroe :" + err))
})

router.route('/delete/:id').delete((req, res) => {
    const id = req.params.id;
    Game.findOneAndDelete({ gameId: id })
        .then(() => res.json("deleted"))
        .catch((err) => res.json("Errod : " + err))

})


router.route('/update').put((req, res) => {
    const gameId = req.body.gameId;
    const gameName = req.body.gameName;
    const gameType = req.body.gameType;
    const gamePhoto = req.body.gamePhoto;
    const updatedData = {
        gameName,
        gameType,
        gamePhoto
    }

    Game.findOneAndUpdate({ gameId: gameId }, updatedData)
        .then(() => res.json("updated"))
        .catch((err) => res.json("Error :" + err))

})


router.route('/:id').get((req, res) => {
    const gameId = req.params.id;
    Game.findOne({ gameId: gameId })
        .then((game) => res.json(game))
        .catch((err) => res.json(err))
});


router.route('/findType/:type').get((req, res) => {

    Game.find({
        gameType: req.params.type
    })
        .then((game) => res.json(game))
        .catch((err) => res.json(err))
});


router.route('/findGame/:gameName').get((req, res) => {

    Game.findOne({
        gameName: req.params.gameName
    })
        .then((game) => res.json(game))
        .catch((err) => res.json(err))
});





module.exports = router;