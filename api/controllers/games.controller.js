const mongoose = require('mongoose');

const Game = mongoose.model('Game');

const getGames = function (req, res) {
    let offset = 0;
    let count = 8;
    const maxCount = 100;
    if (req.query) {
        if (req.query.count)
            count = parseInt(req.query.count);
        if (req.query.offset)
            offset = parseInt(req.query.offset);
    }
    if (isNaN(count) || isNaN(offset)) {
        res.status(400).json({
            err: "Please enter valid API url"
        });
        return;
    }
    if (count > maxCount) {
        res.status(400).json({
            message: "Cannot exceed count of " + maxCount
        });
        return;
    }

    Game.find().skip(offset).limit(count).exec(function (err, games) {
        if (err) {
            console.log('Error finding games');
            res.status(500).json(err);
            return;
        }
        if (games.length == 0) {
            res.status(400).json({
                message: "No games found"
            });
            return;
        }
        console.log('Games found. Total', games.length);
        res.json(games);
    });
};

const getSingle = function (req, res) {
    const gameId = req.params.gameId;
    if (!mongoose.isValidObjectId(gameId)) {
        console.log("Given gameId is not valid");
        res.status(400).json({
            "message": "Given gameId is not valid"
        });
        return;
    }
    const game = Game.findById(gameId).exec(function (err, game) {
        if (err) {
            console.log('Error finding game');
            res.status(500).json(err);
            return;
        }
        if (game) {
            console.log('Game found : ', game);
            res.status(200).json(game);
        }
        else {
            console.log('No game found with given gameId : ', gameId);
            res.status(400).json({
                "message": "No game found with given gameId - " + gameId
            });
        }
    });
}

const addGame = function (req, res) {
    const newGame = {
        title: req.body.title,
        price: parseFloat(req.body.price),
        designers: req.body.designers,
        players: parseInt(req.body.players),
        rate: parseFloat(req.body.rate),
        publisher: req.body.publisher
    };
    console.log(newGame);
    Game.create(newGame, function (err, game) {
        if (err) {
            console.log('Error creating game');
            res.status(500).json(err);
            return;
        }
        console.log('Game Created', game);
        res.status(201).json({
            message: 'Game created'
        });
    });
}

const updateGame = function (req, res) {
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
        game.title = req.body.title;
        game.price = parseFloat(req.body.price);
        game.designers = req.body.designers;
        game.players = req.body.players;
        game.rate = parseFloat(req.body.rate);
        game.publisher = req.body.publisher;
        game.save(function (err, game) {
            if (err) {
                console.log('Error updating game');
                res.status(500).json(err);
                return;
            }
            console.log('Game Updated', game);
            res.status(200).json({
                message: 'Game updated'
            });
        });
    });
}

const deleteGame = function (req, res) {
    var gameId = req.params.gameId;
    if (!mongoose.isValidObjectId(gameId)) {
        console.log("Given gameId is not valid");
        res.status(400).json({
            "message": "Given gameId is not valid"
        });
        return;
    }
    Game.findByIdAndRemove(gameId).exec(function (err, game) {
        if (err) {
            console.log("Error deleting game");
            res.status(500).json({
                message: "Error deleting game"
            });
            return;
        }
        else if (!game) {
            res.status(404).json({
                message: "No game matched with the given gameId"
            });
            return;
        }
        console.log('Game Deleted', game);
        res.status(200).json({
            message: 'Game Deleted'
        });
    });
}

module.exports = {
    getGames: getGames,
    getSingle: getSingle,
    addGame: addGame,
    updateGame: updateGame,
    deleteGame: deleteGame
}