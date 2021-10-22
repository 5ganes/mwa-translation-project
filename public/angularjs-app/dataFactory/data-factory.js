angular.module("meanGame").factory("GameFactory", GameFactory);

function GameFactory($http) {
    return {
        getallGames: getAll,
        getSingleGame: getSingle,
        addOneGame: addOne,
        updateOneGame: updateOne,
        deleteOneGame: deleteGame
    }

    function getAll() {
        return $http.get("api/games")
            .then(complete)
            .catch(failed);
    }

    function getSingle(gameId) {
        return $http.get("api/games/" + gameId)
            .then(complete)
            .catch(failed);
    }

    function addOne(game) {
        return $http.post("api/games/add", game)
            .then(complete)
            .catch(failed);
    }

    function updateOne(game, gameId) {
        return $http.put('/api/games/' + gameId, game).then(complete).catch(failed);
    }

    function deleteGame(gameId) {
        return $http.delete('/api/games/' + gameId).then(complete).catch(failed);
    }

    function complete(response) {
        return response.data;
    }

    function failed(error) {
        return error;
    }
}