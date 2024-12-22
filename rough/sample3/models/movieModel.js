const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    releaseYear: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    imageUrl: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;