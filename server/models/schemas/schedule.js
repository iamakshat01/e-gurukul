const mongoose = require('mongoose');
// 9-10, 10-11, 11-12, 12-1, 2-3, 3-4, 4-5
const defaultSchedule = [null ,null, null, null, null, null];

const ScheduleSchema = new mongoose.Schema({
    monday: defaultSchedule,
    tuesday: defaultSchedule,
    wednesday: defaultSchedule,
    thursday: defaultSchedule,
    friday: defaultSchedule,
}, {timestamps: true});

module.exports = ScheduleSchema;