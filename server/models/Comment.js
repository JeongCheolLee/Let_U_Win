const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    myPick: {
        type: String,
    },
    enemyPick: {
        type: String,
    },
    name: {
        type: String,
    },
    comment: {
        type: String,
    },
    time: {
        type: Date,
    },
    like: {
        type: Number,
    },
    dislike: {
        type: Number,
    },
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = { Comment };
