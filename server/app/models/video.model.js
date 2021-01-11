const mongoose = require('mongoose');
const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    year: {
        type: String
    },
});
module.exports = mongoose.model('Video', videoSchema);