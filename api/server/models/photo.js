const mongoose = require('mongoose');

let PhotoSchema = new mongoose.Schema({
    siteid: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    image: {
        type: String
    }
});

let Photo = mongoose.model('Photo', PhotoSchema, 'photos');

module.exports = { Photo };