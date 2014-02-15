app.controller('DeckCtrl', function ($scope, $location, $q, AuthService, Card, Deck, User, toaster) {

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
        var testbool = checkDeck($scope.wDeck);
        console.log(testbool);
        if (testbool) {
            toaster.pop('success', "Deck könnte gespeichert werden", "", 4000);
        } else {
            toaster.pop('error', "Deck konnte nich gespeichert werden da es eine Falsche struktur hat ", "", 4000);
        }
        Deck.save($scope.wDeck);
        // toaster.pop('success', "Deck wurde erfolgreich Gespeichert", "", 2000);
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

    $scope.checkUser = function (id) {
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
        var deferred = $q.defer();
        var promise = deferred.promise;
        promise.then(function () {

            angular.forEach(deck.cards, function (card) {
                if (card.card.id) {
                    if (card.card.typ.name === 'RASSE') {
                        if (card.stk > 1) {
                            toaster.pop('warning', "Es können von Rassen jeweils nur eine Karte, pro Rasse, ins deck gegeben werden!", "", 3500);
                            boolFalse = true;
                        } else {
                            countRasse += card.stk;
                        }
                    } else {
                        if (card.stk > 3) {
                            toaster.pop('warning', "Es können von normalen Karten nur maximal 3 stk, ins deck gegeben werden!", "", 3500);
                            boolFalse = true;
                        } else {
                            countCard += card.stk;
                        }
                    }

                } else {
                    Card.get({id: card.card}, function (tmpCard) {
                        console.log(tmpCard.typ[0].name + ' === RASSE');
                        if (tmpCard.typ[0].name === 'RASSE') {
                            if (card.stk > 1) {
                                toaster.pop('error', "Es können von Rassen jeweils nur eine Karte, pro Rasse, ins deck gegeben werden!", "", 5000);
                                boolFalse = true;
                            } else {

                                countRasse += card.stk;
                                console.log('CR:' + countRasse);
                            }
                        } else {
                            if (card.stk > 3) {
                                toaster.pop('error', "Es können von normalen Karten nur maximal 3 stk, ins deck gegeben werden!", "", 5000);
                                boolFalse = true;
                            } else {
                                countCard += card.stk;
                                console.log('CC:' + countCard);
                            }
                        }
                    });
                }

            });

        }).then(function () {
                if (boolFalse) {
                    return false;
                } else {
                    console.log('finish: CC:' + countCard + 'CR:' + countRasse);
                    if (countCard > 40) {
                        toaster.pop('error', "Es können maximal (" + countCard + "/)40 Normale karten ins Deck gegebne werden", "", 5000);
                        return false
                    } else {
                        toaster.pop('warning', "Es können bis zu (" + countCard + "/)40 Normale karten und (" + countRasse + "/)10 RASSE Karten ins Deck gegebne werden", "", 3500);
                    }
                    if (countRasse > 10) {
                        toaster.pop('error', "Es können maximal (" + countRasse + "/)10 RASSE Karten ins Deck gegebne werden", "", 5000);
                        return false;
                    } else {
                        toaster.pop('warning', "Es können bis zu (" + countCard + "/)40 Normale karten und (" + countRasse + "/)10 RASSE Karten ins Deck gegebne werden", "", 3500);
                    }
                    return true;
                }

            });
        deferred.resolve();
    }
});