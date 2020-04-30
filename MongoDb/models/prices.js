const mongoose = require('mongoose');

const pricesSchema = new mongoose.Schema({
    date: {
        type: String,
        required: false
    },
    last: {
        type: String,
        required: false
    },
    open: {
        type: String,
        required: false
    },
    max: {
        type: String,
        required: false
    },
    min: {
        type: String,
        required: false
    },
    vol: {
        type: String,
        required: false
    },
    percent: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('StockPrice', pricesSchema)

