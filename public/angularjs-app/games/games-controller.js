angular.module("meanGame").controller("GamesController", GamesController);

function GamesController(GameFactory, $route) {
    const vm = this;
    vm.title = "Game List";
    GameFactory.getallGames().then(function (response) {
        vm.games = response;
    });

    vm.deleteGame = function (gameId) {
        GameFactory.deleteOneGame(gameId).then(function (response) {
            console.log(response);
        });
        $route.reload();
    };

}