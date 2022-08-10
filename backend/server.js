const express = require('express');
require('dotenv').config();
const workoutRoutes = require('./routes/workouts');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');

const app = express();

mongoose.connect(process.env.CONN_STRG)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connect to db & listening to port', process.env.PORT);
        })
    })
    .catch((err) => {
        console.log(err);
    });

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
})

app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);