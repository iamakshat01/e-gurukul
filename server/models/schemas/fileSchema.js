const mongoose = require('mongoose');

const InfoSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

module.exports = InfoSchema;