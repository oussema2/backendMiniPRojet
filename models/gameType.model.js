const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const gameType = new Schema({
    gameId: Schema.Types.ObjectId,
    nameType: {
        type: String,
        require: true,
        unique: true

    }
});


const GameType = mongoose.model('GameType', gameType);

module.exports = GameType;
