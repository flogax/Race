app.controller('CardCtrl', function ($scope, $location, AuthService, Card, Typ, Color, Edition) {

    $scope.cards = Card.getAll();
    $scope.colors = Color.getAll();
    $scope.typs = Typ.getAll();
    $scope.editions = Edition.getAll();

    $scope.nCard = new Card();

    $scope.showCard = function (card) {
        console.log(card);
        var rarity;
        if ($scope.checkRar('co', card.rarity)) {
            rarity = 'b-com';
        } else if ($scope.checkRar('un', card.rarity)) {
            rarity = 'b-uncom';
        } else if ($scope.checkRar('ra', card.rarity)) {
            rarity = 'b-rar';
        } else if ($scope.checkRar('ep', card.rarity)) {
            rarity = 'b-epic';
        } else {
            rarity = 'b-com';
        }

        var white = '';
        if (card.color[0].name === 'black' || card.color[0].name === 'grey') {
            white = "white-color";
        }


        var html = "<div class='card-tool " + rarity + " " + white + "' style='background-color: " + card.color[0].name + "'> " +
            "<span class='name'>" + card.name + "</span>" +
            "<span class='typ'>" + card.typ[0].name + "</span>" +
            "<span class='bild'>text.jpg</span>" +
            "<span class='edition'>" + card.edition.name + "</span>" +
            "<span class='live'>" + card.live + "</span>" +
            "<span class='cost'>" + card.cost + "</span>" +
            "<span class='txt-abi'>" +
            "<span class='ability'>" + card.ability + "</span>" +
            "<span class='text'>" + card.text + " </span>" +
            "</span>" +
            "<span class='werte'>" +
            "<span> " + card.atk + "</span>/" +
            "<span>" + card.ver + " </span>" +
            "</span>" +
            "</div>";

        return html;

    };

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

    function init() {
        if (!AuthService.user) {
            $location.path('race/home');
        }
    }

    init();

    $scope.$on('logout', function () {
        $location.path('race/home');
    });

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
    }

});