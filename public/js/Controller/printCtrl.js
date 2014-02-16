app.controller('PrintCtrl', function ($scope, News, toaster, AuthService, cardPrintService) {
    'use strict';

    $scope.cards = cardPrintService.cards;

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