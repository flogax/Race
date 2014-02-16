app.controller('DeckCtrl', function ($scope, $location, $q, AuthService, cardPrintService, Card, Deck, User, toaster) {

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

    $scope.print = function (deck) {
        cardPrintService.setCarsMulit(deck.cards).then(function () {
            $location.path('race/print');
        });
    };

    $scope.printSingle = function (deck) {
        cardPrintService.setCardsSingle(deck.cards).then(function () {
            $location.path('race/print');
        });
    };

    $scope.$on('logout', function () {
        $location.path('race/home');
        toaster.pop('success', "Erfolgreich ausgelogt", "", 2000);
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
                if (suc) {
                    toaster.pop('success', "Deck wurde efolgreich Angelegt", "", 2000);
                }
            });

        } else {
            toaster.pop('warning', "Fehler beim anlegen vom Deck", "", 2000);
        }
    };

    $scope.openDeck = function (deck) {
        $scope.wDeck = deck;
        $scope.open = true;
        $scope.cards = Card.getAll();
    };

    $scope.save = function () {
        var tempArray = [];
        angular.forEach($scope.wDeck.cards, function (card) {
            if (card.card.id) {
                tempArray.push({card: card.card.id, stk: card.stk});
            } else {
                tempArray.push({card: card.card, stk: card.stk});
            }
        });
        $scope.wDeck.cards = tempArray;
        $scope.wDeck.user = $scope.wDeck.user.id;
        checkDeck($scope.wDeck).then(function (bool) {
            console.log(bool);
            if (bool) {
                toaster.pop('success', "Deck wurde erfolgreich Gespeichert", "", 2000);
                Deck.save($scope.wDeck);
            } else {
                toaster.pop('error', "Deck konnte nich gespeichert werden da es eine Falsche struktur hat ", "", 6000);
            }
        });
        init();
    };

    $scope.removeCard = function (card, index) {
        $scope.wDeck.cards.splice(index, 1);
    };

    $scope.finish = function () {
        angular.forEach($scope.cards, function (card) {
            var bool = true;
            if (card.added) {
                angular.forEach($scope.wDeck.cards, function (wCard) {
                    if (wCard.card.id) {
                        if (wCard.card.id === card.id) {
                            bool = false;
                        }
                    } else {
                        if (wCard.card === card.id) {
                            bool = false;
                        }
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

    $scope.checkUser = function (user) {
        var id;
        if (user.id) {
            id = user.id;
        } else {
            id = user;
        }

        if (AuthService.user) {
            return AuthService.checkUser(id);
        }
        return false;
    };

    $scope.getCard = function (card) {
        var test;
        if (card.card.id) {
            return Card.get(card.card, function (data) {
                test = data;
                return test;
            });
        } else {
            return Card.get({id: card.card}, function (data) {
                test = data;
                return test;
            });
        }

    };

    function checkDeck(deck) {
        var countCard = 0;
        var countRasse = 0;
        var boolFalse = false;
        var promise = [];

        $.each(deck.cards, function (id, card) {
            promise.push(foo(card));
        });

        function foo(card) {
            var deferred = $q.defer();
            Card.get({id: card.card}, function (tmpCard) {
                if (tmpCard.typ[0].name === 'RASSE') {
                    if (card.stk > 1) {
                        toaster.pop('error', "Es können von Rassen jeweils nur eine Karte, pro Rasse, ins deck gegeben werden!", "", 5000);
                        boolFalse = true;
                    } else {
                        countRasse += parseInt(card.stk);
                    }
                } else {
                    if (card.stk > 3) {
                        toaster.pop('error', "Es können von normalen Karten nur maximal 3 stk, ins deck gegeben werden!", "", 5000);
                        boolFalse = true;
                    } else {
                        countCard += parseInt(card.stk);
                    }
                }
                deferred.resolve();
            });
            return deferred.promise;
        }

        return $q.all(promise).then(function () {
            if (boolFalse) {
                return false;
            } else {
                if (countCard > 40 || countRasse > 10) {
                    toaster.pop('error', "Es können maximal (" + countCard + "/)40 Normale karten oder (" + countRasse + "/)10 RASSE Karten, ins Deck gegebne werden", "", 5000);
                    return false
                } else if (countCard < 40 || countRasse < 10) {
                    toaster.pop('warning', "Es können bis zu (" + countCard + "/)40 Normale karten und (" + countRasse + "/)10 RASSE Karten ins Deck gegebne werden", "", 3500);
                }
                return true;
            }
        });
    }

});