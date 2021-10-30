const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    classroom: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'classroom',
    },
    content: {
        type: String,
        required: true,
    },
    files: [String]
}, {timestamps: true});

const Post = mongoose.model('post', PostSchema);

module.exports = Post;