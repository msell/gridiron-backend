'use strict';

angular.module('gridiron')
    .controller('RegisterCtrl', function ($scope, alert, $auth) {
        $scope.submit = function () {
            
            $auth.signup({email: $scope.email, password: $scope.password})
                .then(function (res) {
                    alert('success', 'Account Created', 'Welcome ' + res.data.user.email + '!');                
                })
                .catch(function (err) {
                    alert('warning', 'Snap!', 'Something went wrong :(', err.message)
                });

        }
    });     