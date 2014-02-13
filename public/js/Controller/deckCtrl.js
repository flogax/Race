app.controller('DeckCtrl', function ($scope, $location, AuthService, Card, Deck, User) {

    var user;

    $scope.auth = AuthService;

    function init() {
        if (AuthService.user) {
            user = AuthService.user;
            User.get({id: AuthService.user.id});

            $scope.cards = Card.getAll();
            Deck.getAll(function (data) {
                $scope.decks = data;
            });
        } else {
            $location.path('race/home');
        }

    }

    $scope.$on('logout', function () {
        $location.path('race/home');
    });
    init();

    $scope.open = false;

    $scope.nDeck = new Deck();
    $scope.wDeck = null;

    $scope.createDeck = function () {
        console.log(user);
        if (user) {
            $scope.nDeck.cardCount = 0;
            $scope.nDeck.raceCount = 0;
            $scope.nDeck.user = user.id;
            Deck.create($scope.nDeck, function (suc, err) {
                init();
            });

        }
    };

    $scope.openDeck = function (deck) {
        $scope.wDeck = deck;
        $scope.open = true;
        $scope.cards = Card.getAll();
    };

    $scope.save = function () {
        var deck = $scope.wDeck;
        var tempUser = deck.user;
        deck.decks = [];
        angular.forEach($scope.wDeck.cards, function (card) {
            console.log(card.card);
            deck.decks.push({card: card.card.id, stk: card.stk});
        });
        deck.user = tempUser.id;
        Deck.save(deck);


    };

    $scope.removeCard = function (card, index) {
        $scope.wDeck.cards.splice(index, 1);
    };

    $scope.finish = function () {
        angular.forEach($scope.cards, function (card) {
            var bool = true;
            if (card.added) {
                angular.forEach($scope.wDeck.cards, function (wCard) {
                    if (wCard.card.id === card.id) {
                        bool = false;
                    }
                });
                if (bool) {
                    $scope.wDeck.cards.push({card: card, stk: 0});
                }
            }
        });
    };

    $scope.checkAdded = function (card) {
        if (!card.added) {
            card.added = false;
        }
    };

    $scope.checkUser = function (id) {
        if (AuthService.user) {
            return AuthService.checkUser(id);
        }
        return false;
    };

    $scope.getCard = function (card) {

        console.log(card.id + typeof card.id);
        var test;
        Card.get({id: card.id}, function (data) {
            console.log(data);
            test = data;
        });
        console.log(test);
        return test;
    };
});