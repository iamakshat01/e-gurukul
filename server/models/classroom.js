const mongoose = require('mongoose');
const ScheduleSchema = require('./schemas/schedule');

const ClassroomSchema = new mongoose.Schema({
    batch: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'batch',
    },
    subject: {
        type: String,
        required: true,
    },
    faculty: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'faculty'
    },
    meetlinks: [String],
    schedule: ScheduleSchema
}, {timestamps: true});

const Classroom = mongoose.model('Classroom', ClassroomSchema);

module.exports = Classroom;