app.controller('newsCtrl', function ($scope, News, toaster) {
    'use strict';

    $scope.newsAll = News.getAll();

    $scope.newNews = new News();

    $scope.submit = function () {
        $scope.newNews.$create();
        $scope.newNews = new News();
        $scope.newsAll = News.getAll();
        toaster.pop('success', "Neue News wurde angelegt.", "", 2000);

    };

    $scope.remove = function (news) {
        News.remove(news, function () {
            $scope.newsAll = News.getAll();
        });
    };

    $scope.update = function (news) {
        News.save(news, function () {
            $scope.newsAll = News.getAll();
            toaster.pop('success', "News wurde aktualisiert", "", 2000);
        });
    };

});