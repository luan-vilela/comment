const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Comment = new Schema({
    comment: {
        type: String,
        default: "Nothin' On You"
    },
    ip: String,
    whisper: [],
    like: Number,
    dislike: Number
});

mongoose.model('Comment', Comment);