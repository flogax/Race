app.controller('CardCtrl', function ($scope, AuthService, Card, Typ, Color, Edition) {

    $scope.cards = Card.getAll();
    $scope.colors = Color.getAll();
    $scope.typs = Typ.getAll();
    $scope.editions = Edition.getAll();

    $scope.nCard = new Card();

    $scope.newCard = function () {
        var typ = $scope.nCard.typ;
        var color = $scope.nCard.color;
        var edi = $scope.nCard.edition;
        $scope.nCard.typ = [typ.id];
        $scope.nCard.color = [color.id];
        $scope.nCard.edition = edi.id;
        $scope.nCard.hidden = true;

        if ($scope.nCard.id) {
            Card.save($scope.nCard);
        } else {
            Card.create($scope.nCard);
        }
        $scope.nCard = new Card();
        $scope.cards = Card.getAll();
    };

    $scope.reset = function () {
        $scope.nCard = new Card();
    };

    $scope.loadCard = function (card) {
        $scope.nCard = card;
        $scope.nCard.typ = card.typ[0];
        $scope.nCard.color = card.color[0];
    };

    $scope.checkTyp = function (toHide, typ) {
        if (toHide === 'atk') {
            if (!(typ === 'RASSE' || typ === 'TRUPP' || typ === 'FAHRZEUG' || typ === 'VERTEIDIGER')) {
                $scope.nCard.atk = null;
                $scope.nCard.ver = null;
            }
            return (typ === 'RASSE' || typ === 'TRUPP' || typ === 'FAHRZEUG' || typ === 'VERTEIDIGER');
        }
        if (toHide === 'live') {
            if (!(typ === 'RASSE')) {
                $scope.nCard.live = null;
            }
            return (typ === 'RASSE');
        }
    };


    $scope.checkRar = function (show, rar) {
        if (show === 'co') {
            return (rar === 'commen');
        }
        if (show === 'un') {
            return (rar === 'uncommen');
        }
        if (show === 'ra') {
            return (rar === 'rar');
        }
        if (show === 'ep') {
            return (rar === 'epic');
        }
        return false;
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