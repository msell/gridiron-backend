'use strict';

angular.module('gridiron')
    .service('auth', function ($http, configuration, authToken, $state, $window, $q) {

        function authSuccessful(res) {
            authToken.setToken(res.token);             
            $state.go('main');
        }

        this.login = function (email, password) {
            return $http.post(configuration.apiUrl + 'login', {
                email: email,
                password: password
            }).success(authSuccessful);
        };

        this.register = function (email, password) {
            return $http.post(configuration.apiUrl + 'register', {
                email: email,
                password: password
            }).success(authSuccessful);
        };

        var urlBuilder = [];
        var clientId = '293729951422-1aoar6i6acc23l8lrmb0m2dm9ommefq9.apps.googleusercontent.com';

        urlBuilder.push('response_type=code',
            'client_id=' + clientId,
            'redirect_uri=' + window.location.origin,
            'scope=profile email');

        this.googleAuth = function () {
            var url = "https://accounts.google.com/o/oauth2/auth?" + urlBuilder.join('&');
            var options = "width=500, height=500, left=" + ($window.outerWidth - 500) / 2 + ",top=" + ($window.outerHeight - 500) / 2.5;

            var deferred = $q.defer();

            var popup = $window.open(url, '', options);
            $window.focus();

            $window.addEventListener('message', function (event) {
                if (event.origin === $window.location.origin) {
                    var code = event.data;
                    popup.close();

                    $http.post(configuration.apiUrl + 'auth/google', {
                        code: code,
                        clientId: clientId,
                        redirectUri: window.location.origin
                    }).success(function (jwt) {
                        authSuccessful(jwt);
                        deferred.resolve(jwt);
                    });
                }
            });
            return deferred.promise;
        }
    });