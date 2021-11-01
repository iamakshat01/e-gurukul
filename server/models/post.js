const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    classroom: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Classroom',
    },
    content: {
        type: String,
        required: true,
    },
    files: [String]
}, {timestamps: true});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;