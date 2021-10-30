const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['faculty','admin','student'],
        required: true
    }
}, {timestamps: true});

const User = mongoose.model('user', UserSchema);

module.exports = User;