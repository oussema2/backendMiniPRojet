const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user.model')



const tournamentSchema = new Schema({
    idTournament: Schema.Types.ObjectId,
    nameTournament: {
        type: String,
        require: true
    },

    dateByDate: String,
    dateByTime: String,
    gameOfTournament: {
        type: String,
        require: true,
    },
    numberOfPlayers: {
        type: Number,
        require: true,

    },
    price: {
        type: Number,
        require: true
    },

    idCreator: {
        type: String,
        required: true
    },

    participantNumber: {
        type: Number,
        default: 0
    },
    participants: [{
        userID: String,
        IGN: String,
        avatar: String,





    }],
    tournamentPic: {
        type: String,
        require: true
    }
});


const Tournament = mongoose.model('Tournament', tournamentSchema);

module.exports = Tournament;