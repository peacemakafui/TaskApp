const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title:{
        type:String,
        required: true
    },
    snippet:{
        type: String,
        required:true
    },
    body:{
        type: String,
        required: true
    },
    startDate:{
        type: Date,
        required: true
    }
    ,
    dueDate:{
        type:Date,
        required: true
    }
},{timestamps: true});
const Task = mongoose.model('Task', taskSchema);
module.exports = Task;