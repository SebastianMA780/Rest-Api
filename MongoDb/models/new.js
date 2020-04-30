const mongoose = require('mongoose');

const newSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    url: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('AppleNews', newSchema)

