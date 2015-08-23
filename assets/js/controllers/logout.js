'use strict';

angular.module('gridiron')
    .controller('LogoutCtrl', function ($auth, $state) {
        $auth.logout();
        $state.go('main');
    });