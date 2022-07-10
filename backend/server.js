const express = require('express');
require('dotenv').config();
const workoutRoutes = require('./routes/workouts')

const app = express();

app.listen(process.env.PORT, () => {
    console.log('listening to port', process.env.PORT);
})

app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
})

app.use('/api/workouts', workoutRoutes);