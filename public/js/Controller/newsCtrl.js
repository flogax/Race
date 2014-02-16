app.controller('newsCtrl', function ($scope, News, toaster, AuthService) {
    'use strict';

    $scope.newsAll = News.getAll();
    $scope.auth = AuthService;

    $scope.newNews = new News();

    function initAutosize() {
        $('textarea').autosize();
    }

    initAutosize();

    $scope.getBool = function (check, important) {
        initAutosize();
        return important && check;
    };

    $scope.submit = function () {
        $scope.newNews.date = $scope.dt;
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


    $scope.today = function () {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.showWeeks = true;
    $scope.toggleWeeks = function () {
        $scope.showWeeks = !$scope.showWeeks;
    };

    $scope.clear = function () {
        $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function (date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function () {
        $scope.minDate = ( $scope.minDate ) ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.dateOptions = {
        'year-format': "'yy'",
        'starting-day': 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
    $scope.format = $scope.formats[0];


});