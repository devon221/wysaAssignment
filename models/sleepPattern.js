const mongoose = require('mongoose');

const sleepPatternSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    timeElapsed: { type: String, required: true },
    sleptAt : {type : Date , required:true},
    wokeUpAt : {type: Date , required : true},
    hoursSlept: { type: Number, required: true }
} , {timestamps:true});

const SleepPattern = mongoose.model('SleepPattern', sleepPatternSchema);

module.exports = SleepPattern;