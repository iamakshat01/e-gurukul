const mongoose = require('mongoose');

const defaultSchedule = [
    [null ,null, null, null, null, null, null, null],
    [null ,null, null, null, null, null, null, null],
    [null ,null, null, null, null, null, null, null],
    [null ,null, null, null, null, null, null, null],
    [null ,null, null, null, null, null, null, null]
]

const ScheduleSchema = new mongoose.Schema({
    default: defaultSchedule
}, {timestamps: true});

module.exports = ScheduleSchema;