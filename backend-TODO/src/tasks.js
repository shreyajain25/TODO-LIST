const mongoose = require('mongoose');

const tasksSchema = new mongoose.Schema({
    taskname:{
        type: String,
        required: true,
        trim: true,
    },
    description:{
        type: String,
        trim: true,
    },
    deadline:{
        type: Date,
    },
    done:{
        type: Boolean,
    }
}, {timestamps: true});

module.exports = mongoose.model('Tasks', tasksSchema);