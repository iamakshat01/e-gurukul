const mongoose = require('mongoose');
const ScheduleSchema = require('./schemas/schedule');
// {class_id, batch, subject}
const initialSchedule = 
[
    [null, null, null, null, null, null, null], 
    [null, null, null, null, null, null, null], 
    [null, null, null, null, null, null, null], 
    [null, null, null, null, null, null, null], 
    [null, null, null, null, null, null, null], 
    [null, null, null, null, null, null, null], 
    [null, null, null, null, null, null, null], 
];

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
        enum: ['active', 'inactive'],
        default: 'active',  
    },
    // mon, tue, wed, thr, fri, sat, sun
    schedule: {
        type: mongoose.SchemaTypes.Array,
        default: initialSchedule
    }
}, {timestamps: true});

const Classroom = mongoose.model('Classroom', ClassroomSchema);

module.exports = Classroom;