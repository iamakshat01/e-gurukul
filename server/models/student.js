const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    roll_no: {
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
    batch: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'batch'
    },
    dob: {
        type: Date
    }
}, {timestamps: true});

const Student = mongoose.model('student', StudentSchema);

module.exports = Student;