angular.module('meanGame').controller('AddEditGameController', AddEditGameController);

function AddEditGameController(GameFactory, $routeParams, $route) {
    const vm = this;
    vm.pageTitle = "Add/Edit Game";

    if ($routeParams.gameId) {
        GameFactory.getSingleGame($routeParams.gameId).then(function (response) {
            vm.gameId = response._id;
            vm.title = response.title;
            vm.price = response.price;
            vm.players = response.players;
            vm.rate = response.rate;
            vm.designers = response.designers.join();
            vm.publisherName = response.publisher.name;
            vm.publisherCountry = response.publisher.country;
        });
    }

    const splitCommaSeparatedStrings = function (str) {
        var result;
        if (str && str.length > 0) {
            result = str.split(",");
        }
        else {
            result = [];
        }
        return result;
    }

    // add and update game in single function
    vm.saveGame = function () {
        const publisher = {
            name: vm.publisherName,
            country: vm.publisherCountry
        };
        // console.log(publisher);
        const addUpdateGame = {
            title: vm.title,
            price: parseFloat(vm.price),
            players: parseInt(vm.players),
            rate: parseFloat(vm.rate),
            designers: splitCommaSeparatedStrings(vm.designers),
            publisher: {
                name: vm.publisherName,
                country: vm.publisherCountry
            }
        };
        // console.log(addUpdateGame);
        if (vm.addUpdateForm.$valid) {
            if (!vm.gameId) {
                GameFactory.addOneGame(addUpdateGame).then(function (response) {
                    console.log("Game Added", response);
                });
            }
            else {
                GameFactory.updateOneGame(addUpdateGame, vm.gameId).then(function (response) {
                    console.log("Game Updated", response);
                });
            }
            $route.reload();
            window.location.href = '#!/games';
        }
        else {
            vm.isSubmitted = false;
        }
    };
}

