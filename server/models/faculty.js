const mongoose = require('mongoose');
const ScheduleSchema = require('./schemas/schedule');

const FacultySchema = new mongoose.Schema({
    faculty_code: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true
    },
    classrooms: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'classroom'
    }],
    schedule: ScheduleSchema
}, {timestamps: true});

const Faculty = mongoose.model('faculty', FacultySchema);

module.exports = Faculty;