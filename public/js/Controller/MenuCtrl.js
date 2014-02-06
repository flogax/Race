app.controller('MenuCtrl', function ($scope, $location, AuthService) {
    'use strict';

    $scope.auth = AuthService;

    $scope.logout = function () {
        AuthService.revokeAuth();
    };

    $scope.isActive = function (route) {
        return $location.path().indexOf(route.substring(1), 1) !== -1;
    };

});