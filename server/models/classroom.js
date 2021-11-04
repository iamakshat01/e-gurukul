const mongoose = require('mongoose');
const ScheduleSchema = require('./schemas/schedule');

const ClassroomSchema = new mongoose.Schema({
    batch: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Batch',
        required: true
    },
    subject: {
        type: String,
        required: true,
    },
    faculty: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Faculty',
        required: true,
    },
    meet_link: {
        type: String,
        default: ''
    },
    alternate_link: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['active','inactive'],
        default: 'active'
    }
}, {timestamps: true});

const Classroom = mongoose.model('Classroom', ClassroomSchema);

module.exports = Classroom;