const mongoose = require('mongoose');
const InfoSchema = require('./schemas/info');

const StudentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    roll_no: {
        type: String,
        required: true,
    },
    batch: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Batch',
        required: true,
    },
    personal_info: InfoSchema
}, {timestamps: true});

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;