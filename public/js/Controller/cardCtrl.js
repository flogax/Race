app.controller('CardCtrl', function ($scope, AuthService, Card, Typ, Color, Edition) {

    $scope.cards = Card.getAll();
    $scope.colors = Color.getAll();
    $scope.typs = Typ.getAll();
    $scope.edition = Edition.getAll();

    $scope.nCard = new Card();

    $scope.newCard = function () {

        $scope.nCard.$create();
        $scope.nCard = new Card();


    };

    $scope.checkTyp = function (toHide, typ) {
        if (toHide === 'atk') {
            return (typ === 'RASSE' || typ === 'TRUPP' || typ === 'FAHRZEUG' || typ === 'VERTEIDIGER');
        }
        if (toHide === 'live') {
            return (typ === 'RASSE');
        }
    };


    $scope.checkCost = function (cost) {
        if (cost === -1) {
            return "ST";
        }

        return cost;
    };
    $scope.checkLive = function (live) {
        if (live === -1) {
            return ""
        }

        if (live === 0) {
            return "STARTER";
        }
        return live;
    };
    $scope.checkAtk = function (atk) {
        if (atk === -1) {
            return "";
        }
        return atk;
    };
    $scope.checkVer = function (ver) {
        if (ver === -1) {
            return "";
        }
        return ver;
    };

});