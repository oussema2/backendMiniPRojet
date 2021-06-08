const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId: Schema.Types.ObjectId,
    IGN: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        trim: true,


    },
    userPrenom: {
        type: String,
        required: true,
        trim: true,


    },
    userDate: {
        type: String,
        required: false,


    },
    userEmail: {
        type: String,
        required: true,
        trim: true,


    },
    userPassword: {
        type: String,
        required: true,


    },
    age: {
        type: String,
        reauired: true,
    },
    avatar: {
        type: String,
        require: true

    }

})

const User = mongoose.model('User', userSchema);
module.exports = User;
