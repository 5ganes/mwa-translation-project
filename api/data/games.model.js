const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
});

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: Number,
    players: {
        type: Number,
        min: 1,
        max: 10
    },
    rate: {
        type: Number,
        min: 1,
        max: 5,
        default: 1
    },
    designers: [String],
    publisher: {
        type: publisherSchema,
        required: false
    }
});

mongoose.model('Game', gameSchema, 'games');