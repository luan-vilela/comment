const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Comment = new Schema({
    comment: {
        type: String,
        default: "Nothin' On You"
    },
    ip: String,
    whisper: [],
    like: {
        type: Number,
        default: 0
    },
    dislike: {
        type: Number,
        default: 0
    }
});

mongoose.model('Comment', Comment);