const mongoose = require('mongoose');
const Game = mongoose.model('Game');
const Review = mongoose.model('Review');

const add = function (req, res) {
    var gameId = req.params.gameId;
    if (!mongoose.isValidObjectId(gameId)) {
        console.log("Given gameId is not valid");
        res.status(400).json({
            "message": "Given gameId is not valid"
        });
        return;
    }
    Game.findById(gameId).exec(function (err, game) {
        if (err) {
            console.log("Error finding game");
            res.status(500).json({
                message: "Error finding game"
            });
            return;
        }
        else if (!game) {
            res.status(404).json({
                message: "No game matched with the given gameId"
            });
            return;
        }
        const newReview = {
            name: req.body.name,
            review: req.body.review,
            date: new Date(),
            gameId: gameId
        };
        Review.create(newReview, function (err, review) {
            if (err) {
                console.log('Error creating review');
                res.status(500).json(err);
                return;
            }
            console.log('Review Created', review);
            res.status(201).json({
                message: 'Review created'
            });
        });
    });
}

const getAll = function (req, res) {
    var gameId = req.params.gameId;
    if (!mongoose.isValidObjectId(gameId)) {
        console.log("Given gameId is not valid");
        res.status(400).json({
            "message": "Given gameId is not valid"
        });
        return;
    }
    Review.find({ gameId: gameId }).exec(function (err, reviews) {
        if (err) {
            console.log("Error finding reviews");
            res.status(500).json({
                message: "Error finding reviews"
            });
            return;
        }
        else if (!reviews) {
            res.status(404).json({
                message: "No reviews matched with the given gameId"
            });
            return;
        }
        res.status(200).json(reviews);
        return;
    });
}

const getSingle = function (req, res) {
    var reviewId = req.params.reviewId;
    if (!mongoose.isValidObjectId(reviewId)) {
        console.log("Given reviewId is not valid");
        res.status(400).json({
            "message": "Given reviewId is not valid"
        });
        return;
    }
    Review.findById(reviewId).exec(function (err, review) {
        if (err) {
            console.log("Error finding review");
            res.status(500).json({
                message: "Error finding review"
            });
            return;
        }
        else if (!review) {
            res.status(404).json({
                message: "No review matched with the given reviewId"
            });
            return;
        }
        res.status(200).json(review);
        return;
    });
}

const deleteReview = function (req, res) {
    console.log('s');
    var reviewId = req.params.reviewId;
    if (!mongoose.isValidObjectId(reviewId)) {
        console.log("Given reviewId is not valid");
        res.status(400).json({
            "message": "Given reviewId is not valid"
        });
        return;
    }
    Review.findByIdAndRemove(reviewId).exec(function (err, review) {
        if (err) {
            console.log("Error deleting review");
            res.status(500).json({
                message: "Error deleting review"
            });
            return;
        }
        else if (!review) {
            res.status(404).json({
                message: "No review matched with the given reviewId"
            });
            return;
        }
        console.log('Review Deleted', review);
        res.status(200).json({
            message: 'Review Deleted'
        });
    });
}

module.exports = {
    getAll: getAll,
    getSingle: getSingle,
    add: add,
    deleteReview: deleteReview
}