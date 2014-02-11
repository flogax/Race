app.controller('DeckCtrl', function ($scope, AuthService, Card, Deck, User) {

    var user;

    $scope.auth = AuthService;

    function init() {
        if (AuthService.user) {
            User.get({id: AuthService.user.id}, function (data) {
                user = data;
                if (AuthService.restrictTo('operrator')) {
                    $scope.cards = Card.getAll();
                    Deck.getAll(function (data) {
                        $scope.decks = data;
                        console.log('Decks:');
                        console.log($scope.decks[0].cards);
                    });

                } else if (AuthService.restrictTo('public')) {
                    $scope.cards = Card.getAll();
                    $scope.decks = user.decks;
                    console.log($scope.decks[0].cards);
                } else {
                    $scope.cards = [];
                    $scope.decks = [];
                }
            });
        }
    }

    init();

    $scope.open = false;

    $scope.nDeck = new Deck();
    $scope.wDeck = null;

    $scope.createDeck = function () {
        if (user) {
            $scope.nDeck.cardCount = 0;
            $scope.nDeck.raceCount = 0;
            $scope.nDeck.user = user.id;
            Deck.create($scope.nDeck, function (suc, err) {
                var temArray = [];
                angular.forEach(user.decks, function (data) {
                    temArray.push(data.id);
                });
                temArray.push(suc.id);
                user.decks = temArray;
                user.$save(function (data) {
                    $scope.nDeck = new Deck();
                    init();
                });
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

    $scope.getCard = function (id) {
        console.log(id);
        var test;
        Card.get({id: id}, function (data) {
            console.log(data);
            test = data;
        });
        console.log(test);
        return test;
    };
});