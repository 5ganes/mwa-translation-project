angular.module("meanGame", ["ngRoute"]).config(config);

function config($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'angularjs-app/main/main.html'
        })
        .when('/games', {
            templateUrl: 'angularjs-app/games/games.html',
            controller: 'GamesController',
            controllerAs: "vm"
        })
        .when('/games/addeditgame', {
            templateUrl: 'angularjs-app/games/addEditGame/addeditgame.html',
            controller: 'AddEditGameController',
            controllerAs: "vm"
        })
        .when('/games/:gameId', {
            templateUrl: 'angularjs-app/oneGame/game.html',
            controller: 'GameController',
            controllerAs: "vm"
        })
        .when('/games/:gameId/edit', {
            templateUrl: 'angularjs-app/games/addEditGame/addeditgame.html',
            controller: 'AddEditGameController',
            controllerAs: "vm"
        })
        .otherwise({
            redirectTo: '/'
        });
}