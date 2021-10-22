angular.module("meanGame").controller("GameController", GameController);

function GameController(GameFactory, $routeParams) {
    const vm = this;
    GameFactory.getSingleGame($routeParams.gameId).then(function (response) {
        vm.game = response;
        vm.gameStars = new Array(response.rate);
        console.log(vm.game);
    });
}