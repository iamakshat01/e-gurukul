const mongoose = require('mongoose');

const InfoSchema = new mongoose.Schema({
    first_name: {
        type: String,
        default: ''
    },
    last_name: {
        type: String,
        default: ''
    },
    dob: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        default: ''
    },
    mobile: {
        type: String,
        default: ''
    }
}, {timestamps: true});

module.exports = InfoSchema;