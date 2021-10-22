const mongoose = require('mongoose');
const Game = mongoose.model('Game');

const get = function (req, res) {
    const gameId = req.params.gameId;
    if (!mongoose.isValidObjectId(gameId)) {
        console.log("Given gameId is not valid");
        res.status(400).json({
            "message": "Given gameId is not valid"
        });
        return;
    }
    const publisher = Game.findById(gameId).select('publisher').exec(function (err, publisher) {
        if (err) {
            console.log('Error finding publisher');
            res.status(500).json(err);
            return;
        }
        if (publisher.publisher) {
            console.log('Publisher found :', publisher);
            res.status(200).json(publisher.publisher);
        }
        else {
            console.log('No publisher found with given gameId : ', gameId);
            res.status(400).json({
                "message": "No publisher found with given gameId - " + gameId
            });
        }
    });
}

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
        const newPublisher = {
            name: req.body.name,
            country: req.body.country
        };
        game.publisher = newPublisher;
        game.save(function (err, game) {
            if (err) {
                console.log('Error adding publisher of game');
                res.status(500).json(err);
                return;
            }
            console.log('Publisher of a game Added', game);
            res.status(200).json({
                message: 'Publisher of a game Added'
            });
        });
    });
}

const update = function (req, res) {
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
        const updatePublisher = {
            name: req.body.name,
            country: req.body.country
        };
        game.publisher = updatePublisher;
        game.save(function (err, game) {
            if (err) {
                console.log('Error updating publisher of game');
                res.status(500).json(err);
                return;
            }
            console.log('Publisher of a game updated', game);
            res.status(200).json({
                message: 'Publisher of a game updated'
            });
        });
    });
}

const deletePub = function (req, res) {
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
        game.publisher.remove();
        game.save(function (err, game) {
            if (err) {
                console.log('Error deleting publisher of game');
                res.status(500).json(err);
                return;
            }
            console.log('Publisher of a game deleted', game);
            res.status(200).json({
                message: 'Publisher of a game deleted'
            });
        });
    });
}

module.exports = {
    get: get,
    add: add,
    update: update,
    delete: deletePub
}