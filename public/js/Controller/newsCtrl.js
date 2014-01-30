app.controller('newsCtrl', function ($scope, News) {
    'use strict';

    $scope.newsAll = News.getAll();

});