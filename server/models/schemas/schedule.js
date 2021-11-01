const mongoose = require('mongoose');

const defaultSchedule = [null ,null, null, null, null, null, null, null];

const ScheduleSchema = new mongoose.Schema({
    monday: defaultSchedule,
    tuesday: defaultSchedule,
    wednesday: defaultSchedule,
    thursday: defaultSchedule,
    friday: defaultSchedule,
}, {timestamps: true});

module.exports = ScheduleSchema;