const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const gameSchema = new Schema({
    gameId: Schema.Types.ObjectId,
    gameName: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    gameType: {
        type: String,
        require: true

    },
    gamePhoto: {
        type: String,
        require: true,
    },
    tournamentNumber: {
        type: Number,
        default: 0,
    }
})

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;