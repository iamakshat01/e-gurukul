const mongoose = require('mongoose');
const ScheduleSchema = require('./schemas/schedule');

const BatchSchema = new mongoose.Schema({
    batch_code: {
        type: String,
        required: true,
    },
    start_year: {
        type: String,
        required: true,
    },
    end_year: {
        type: String,
        required: true
    },
    schedule: ScheduleSchema
}, {timestamps: true});

const Batch = mongoose.model('Batch', BatchSchema);

module.exports = Batch;