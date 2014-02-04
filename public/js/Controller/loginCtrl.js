app.controller('LoginCtrl', function ($scope, AuthService) {

    $scope.login = function () {
        AuthService.authenticate($scope.nickname, $scope.password)
            .then(function () {
                $scope.nickname = '';
                $scope.password = '';
                $scope.errorMsg = '';
                $('#loginModal').modal('toggle');

            }).catch(function (err) {
                $scope.form.$setPristine();
                $scope.password = '';
                $scope.errorMsg = err;
            });
    };

    $scope.reset = function () {
        $scope.nickname = '';
        $scope.password = '';
        $scope.errorMsg = '';
    };

});