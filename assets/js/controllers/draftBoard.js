(function () {
  'use strict';

  angular.module('gridiron')
    .controller('DraftBoardCtrl', function ($scope, $http, configuration, alert, $auth, $state) {

      if (!$auth.isAuthenticated()) {
        $state.go('login');
      }

      $http.get(configuration.apiUrl + 'player').success(function (players) {
        $scope.players = players;
        console.log(players);
      }).error(function (err) {
        alert('warning', 'unable to get players', err);
      });



    });

})();
