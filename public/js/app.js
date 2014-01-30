var app = angular.module('app', [ 'ngResource', 'ngRoute', 'common']);

app.config(function($routeProvider, $locationProvider) {
    'use strict';

    $routeProvider.
        when('/', { redirectTo: '/race/home' }).
        when('/race/rules', { templateUrl: '/public/partials/regeln.html'}).
        when('/race/home', { templateUrl: '/public/partials/home.html', controller: 'newsCtrl'}).
        otherwise({ redirectTo: '/race/home' });
    $locationProvider.html5Mode(true);
});