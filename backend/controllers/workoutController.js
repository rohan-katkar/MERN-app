const { default: mongoose } = require('mongoose');
const workout = require('../models/workout.model');

// get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await workout.find({}).sort({createdAt: -1});

    res.status(200).json(workouts);
}

// get single workout
const getSingleWorkout = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({errorMessage: "No such workout found"});
    }

    const singleWorkout = await workout.findById(id);
    if(!singleWorkout){
        return res.status(400).json({errormessage: "No such workout found"});
    }

    res.status(200).json(singleWorkout);
}

// create a workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body;

    let emptyFields = []
    if(!title){
        emptyFields.push('title');
    }
    if(!load){
        emptyFields.push('load');
    }
    if(!reps){
        emptyFields.push('reps');
    }
    if(emptyFields.length > 0){
        res.status(400).json({ error: 'Please fill out all the fields', emptyFields });
    }

    // add document to db
    try {
        const w = await workout.create({ title, load, reps });
        res.status(200).json(w);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({errorMessage: "No such workout found"});
    }

    const deletedWorkout = await workout.findOneAndDelete({_id: id});
    if(!deletedWorkout){
        return res.status(400).json({errormessage: "No such workout found"});
    }

    res.status(200).json(deletedWorkout);
}

// update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({errorMessage: "No such workout found"});
    }

    const updatedWorkout = await workout.findOneAndUpdate({_id: id}, { ...req.body });
    if(!updatedWorkout) {
        return res.status(400).json({errormessage: "No such workout found"});
    }

    res.status(200).json(updatedWorkout);
}

module.exports = { 
    createWorkout,
    getWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
}