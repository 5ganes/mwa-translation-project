const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    gameId: {
        type: String,
        required: true
    }
});

mongoose.model('Review', reviewSchema, 'reviews');