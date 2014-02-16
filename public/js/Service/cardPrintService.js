common.service('cardPrintService', function ($q, $http, $location, $rootScope, Card) {
    'use strict';

    var that = this;

    this.cards = null;

    var colors = {
        red: { back: 'red', font: 'black'},
        green: {back: 'green', font: 'black'},
        blue: {back: 'blue', font: 'black'},
        black: {back: 'black', font: 'white'},
        white: {back: 'white', font: 'black'},
        purple: {back: 'purple', font: 'black'},
        grey: {back: 'grey', font: 'white'}
    };

    this.setCardsSingle = function (cards) {

        var tmp = [];
        var promise = [];

        $.each(cards, function (id, card) {
            if (card.card.id) {
                promise.push(pushSync(card.card.id));
            } else {
                promise.push(pushSync(card.card));
            }
        });

        function pushSync(id) {
            var deferred = $q.defer();
            Card.get({id: id}, function (data) {
                tmp.push({card: data, stk: 1});
                deferred.resolve();
            });
            return deferred.promise;
        }

        return $q.all(promise).then(function () {
            that.cards = tmp;
        });
    };

    this.setCarsMulit = function (cards) {

        var tmp = [];
        var promise = [];

        $.each(cards, function (id, card) {
            promise.push(pushSync(card));
        });

        function pushSync(card) {
            var deferred = $q.defer();
            if (card.card.id) {
                Card.get(card.card, function (data) {
                    for (var i = 0; i < card.stk; i++) {
                        tmp.push({card: data, stk: card.stk});
                    }
                    deferred.resolve();
                });
            } else {
                Card.get({id: card.card}, function (data) {
                    for (var i = 0; i < card.stk; i++) {
                        tmp.push({card: data, stk: card.stk});
                    }
                    deferred.resolve();
                });
            }
            return deferred.promise;
        }

        return $q.all(promise).then(function () {
            that.cards = tmp;
        });
    };

    this.getColor = function (colorString) {
        return colors[colorString];
    }

});