const mongoose = require('mongoose');

const InfoSchema = new mongoose.Schema({
    first_name: {
        type: String,
        minlength: 3
    },
    last_name: {
        type: String,
        minlength: 3
    },
    dob: {
        type: Date
    },
    email: {
        type: String
    },
    mobile: {
        type: 'Number'
    }
}, {timestamps: true});

module.exports = InfoSchema;