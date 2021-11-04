const mongoose = require('mongoose');
const fileSchema = require('./schemas/fileSchema');
const commentSchema = require('./schemas/commentSchema');

const PostSchema = new mongoose.Schema({
    classroom: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Classroom',
    },
    content: {
        title: {
            type: String,
            required: true,
        },
        subtitle: {
            type: String,
            default: ""
        },
        info: {
            type: String,
            default: ''
        }
    },
    files: [fileSchema],
    comments: [commentSchema]
}, {timestamps: true});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;