const mongoose = require('mongoose');
const ScheduleSchema = require('./schemas/schedule');
const InfoSchema = require('./schemas/info');

const FacultySchema = new mongoose.Schema({
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    faculty_code: {
        type: String,
        required: true,
    },
    personal_info: InfoSchema,
    schedule: ScheduleSchema
}, {timestamps: true});

const Faculty = mongoose.model('Faculty', FacultySchema);

module.exports = Faculty;