'use strict';

/** select track controller **/

angular.module('app')
  .controller('SelectTrackController', ['$scope', 'Track', '$state', 'User',
    function($scope, Track, $state, User) {
      // set username for account info
      $scope.username = User;

      // check to see if user is logged in, if not redirect to forbidden
      if ($scope.username.text == undefined)
        $state.go('forbidden'); // go to forbidden page
      // else continue on select track page
      else {
        // get list of tracks from the datasource and align them
        $scope.tracks = Track.find();

        // logout function
        $scope.logout = function() {
          $state.go('login'); // go back to login page once logged out
        };
      }
    },
  ]);
