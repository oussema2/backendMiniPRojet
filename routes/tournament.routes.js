const Tournament = require('../models/tournament.model');
const router = require('express').Router();
const User = require('../models/user.model')
const Game = require('../models/game.model');
const uploadsTournament = require('../multers/multerTournament');



router.route('/').get((req, res) => {
    Tournament.find()
        .then((tournaments) => res.json(tournaments))
        .catch((err) => res.json("Error : " + err))
})

router.route('/home').get((req, res) => {
    Tournament.find().limit(3)
        .then((games) => res.json(games))
        .catch((err) => res.json("Error :" + err))

});

router.route('/add').post(uploadsTournament.single("tournamentPic"), (req, res) => {
    const dateByDate = req.body.dateByDate;
    const dateByTime = req.body.dateByTime;

    const gameOfTournament = req.body.gameOfTournament;
    const numberOfPlayers = req.body.numberOfPlayers;
    const price = req.body.price;
    const idCreator = req.body.idCreator;
    const nameTournament = req.body.nameTournament;
    const tournamentPic = req.file.filename




    const newTournament = new Tournament({ nameTournament, dateByTime, dateByDate, gameOfTournament, numberOfPlayers, price, idCreator, tournamentPic })
    newTournament.save()
        .then(() => {
            res.json('added')
        })
        .catch((err) => res.json("Error : " + err))

    Game.findOneAndUpdate({ gameName: gameOfTournament }, { $inc: { tournamentNumber: 1 } })



})

router.route('/delete/:id').delete((req, res) => {
    Tournament.findByIdAndRemove(req.params.id)
        .then(() => res.json("deleted"))
        .catch((err) => res.json("Error :" + err))
})


router.route('/join/:id').put((req, res) => {
    const userID = req.body.userID
    const IGN = req.body.IGN;
    const avatar = req.body.avatar;
    const newUser = {
        userID,
        IGN,
        avatar
    }
    Tournament.findByIdAndUpdate({ _id: req.params.id }, { $inc: { participantNumber: 1 }, $push: { participants: newUser } })
        .then(() => res.json("joined"))
        .catch((err) => res.json("Error :" + err))

})

router.route('/dashboardTournaments').get((req, res) => {
    Tournament.find({}).select('_id nameTournament dateTournament numberOfPlayers participantNumber')
        .then((data) => res.json(data))
        .catch((err) => res.json("Error : " + err))
});

router.route('/findWithGame/:game').get((req, res) => {
    Tournament.find({ gameOfTournament: req.params.game })
        .then((data) => res.json(data))
        .catch((err) => res.json(err))
})




router.route('/findOne/:id').get((req, res) => {
    Tournament.findById({ _id: req.params.id })
        .then((data) => res.json(data))
        .catch((err) => res.json(err))
})
module.exports = router;


