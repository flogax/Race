common.service('AuthService', function ($q, $http, $location, $rootScope) {
    'use strict';

    var that = this;

    var routeCache;

    var roles = {
        user: 1,    // 001
        op: 2,      // 010
        admin: 4    // 100
    };

    var accessLevels = {
        admin: roles.admin,
        operrator: roles.admin | roles.op,
        registered: roles.admin | roles.op | roles.user,
        public: roles.admin | roles.op | roles.user
    };

    this.user = null;

    this.authenticate = function (username, password) {
        var deferred = $q.defer();

        var data = { username: username, password: password };

        $http.post("/api/login", JSON.stringify(data))
            .success(function (data, status) {
                if (status === 200 || status === 204) {
                    that.user = data;
                    $rootScope.$broadcast('login', that.user);
                    deferred.resolve(data);
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

        $http.post("/api/logout")
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

        $http.get("/api/ping")
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
            // console.log('Auth:'+roles[that.user.role] +'=' + accessLevels[accessLevel] );
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
                changeRoute('/home');
            }).catch(function () {
                changeRoute('/home');
            });

        function changeRoute(route) {
            if (!that.restrictTo(next.accessLevel)) {
                // cache requested route for proper redirection after login
                routeCache = buildRoute(next.originalPath, next.pathParams);

                $location.path(route);
            }
        }
    });

    this.checkUser = function (id) {
        return (this.user.id === id);
    };
});