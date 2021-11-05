const mongoose = require('mongoose');

const InfoSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
},{timestamps: true});

module.exports = InfoSchema;