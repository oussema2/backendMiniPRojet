const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.routes');
const gameRoutes = require('./routes/game.routes');
const gameTypeRoutes = require('./routes/gameType.routes');
const tournamentRoutes = require('./routes/tournament.routes');
const path = require('path')
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfuly")
});

app.use('/user', userRoutes);
app.use('/game', gameRoutes)
app.use('/gameType', gameTypeRoutes)
app.use('/tournament', tournamentRoutes)

app.use('/images', express.static('./uploads'));



app.listen(port, () => {
    console.log(`server is running on port : ${port}`);

});


