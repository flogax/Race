common.service('AuthService', function ($q, $http, $location, $rootScope) {
    'use strict';

    var that = this;

    var routeCache;

    var roles = {
        user: 1,    // 001
        speaker: 2, // 010
        admin: 4    // 100
    };

    var accessLevels = {
        speaker: roles.admin | roles.speaker,
        registered: roles.admin | roles.speaker | roles.user,
        public: roles.admin | roles.speaker | roles.user
    };

    this.user = null;

    this.authenticate = function (username, password) {
        var deferred = $q.defer();

        var data = { username: username, password: password };

        $http.post("/api/v1/login", JSON.stringify(data))
            .success(function (data, status) {
                if (status === 200 || status === 204) {
                    that.user = data;
                    $rootScope.$broadcast('login', that.user);
                    deferred.resolve(data);

                    // redirect to cached route or presentation overview
                    // var route = routeCache || '/presentations';
                    // $location.path(route);
                }
                deferred.reject(data);
            }).error(function (data) {
                deferred.reject(data);
            }
        );

        return deferred.promise;
    };

    this.revokeAuth = function () {
        var deferred = $q.defer();

        $http.post("/api/v1/logout")
            .success(function (data, status) {
                if (status === 200 || status === 204) {
                    that.user = null;
                    $rootScope.$broadcast('logout');
                    deferred.resolve(data);
                }
                deferred.reject(data);
            }).error(function () {
                deferred.reject(data);
            });

        return deferred.promise;
    };

    this.checkAuth = function () {
        var deferred = $q.defer();

        $http.get("/api/v1/ping")
            .success(function (data, status) {
                if (status === 200 || status === 204) {
                    if (!that.user) {
                        that.user = data;
                        $rootScope.$broadcast('login', that.user);
                    }
                    deferred.resolve();
                    return;
                }
                deferred.reject();
            }).error(function () {
                if (that.user) {
                    // do a logout if we were logged in when the auth check failed
                    that.user = null;
                    $rootScope.$broadcast('logout');
                }
                deferred.reject();
            });

        return deferred.promise;
    };

    this.restrictTo = function (accessLevel) {
        if (!accessLevel) {
            return true;
        }

        if (that.user) {
            // !! converts the expression to a boolean
            return !!(roles[that.user.role] & accessLevels[accessLevel]);
        }

        return false;
    };

    /**
     * Replaces all placeholders in a route with the actual keys provided by the pathParams object.
     * @param route {String} route which should be build
     * @param pathParams {Object} object that holds the keys for the route, must not be null or undefined
     * @returns {String} final route string
     */
    function buildRoute(route, pathParams) {
        for (var p in pathParams) {
            if (pathParams.hasOwnProperty(p)) {
                route = route.replace(':' + p, pathParams[p]);
            }
        }

        return route;
    }

    $rootScope.$on('$routeChangeStart', function (event, next) {
        that.checkAuth()
            .then(function () {
                changeRoute('/presentations');
            }).catch(function () {
                changeRoute('/login');
            });

        function changeRoute(route) {
            if (!that.restrictTo(next.accessLevel)) {
                // cache requested route for proper redirection after login
                routeCache = buildRoute(next.originalPath, next.pathParams);

                $location.path(route);
            }
        }
    });
});