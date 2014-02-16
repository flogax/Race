app.controller('PrintCtrl', function ($scope, $location, AuthService, cardPrintService) {
    'use strict';

    $scope.cards = cardPrintService.cards;

    init();
    function init() {
        if (!cardPrintService.cards) {
            $location.path('/race/decks');
        }
    }


    $scope.getStk = function (card) {
        console.log('stk:');
        console.log(card);
        var test = [];
        for (var i = 0; i < card.stk; i++) {
            test.push(1);
        }
        console.log(test);
        return test;
    }

});