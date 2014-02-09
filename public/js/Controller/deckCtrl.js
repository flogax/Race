app.controller('DeckCtrl', function ($scope, AuthService, Card, Deck) {

    $scope.cards = Card.getAll();
    $scope.decks = Deck.getAll();

    $scope.open = false

    $scope.nDeck = new Deck();
    $scope.wDeck = null;

    $scope.createDeck = function () {

        $scope.nDeck.cardCount = 0;
        $scope.nDeck.raceCount = 0;
        Deck.create($scope.nDeck);
        $scope.nDeck = new Deck();
        $scope.decks = Deck.getAll();
    };

    $scope.openDeck = function (deck) {
        $scope.wDeck = deck;
        $scope.open = true;
        $scope.cards = Card.getAll();
    };

    $scope.save = function () {
        console.log('start');
        var deck = $scope.wDeck;
        deck.decks = [];
        angular.forEach($scope.wDeck.cards, function (card) {
            console.log('for each');
            deck.decks.push({card: card.card.id, stk: card.stk});
        });
        Deck.save(deck);

    };

    $scope.removeCard = function (card, index) {
        console.log(index);
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
});