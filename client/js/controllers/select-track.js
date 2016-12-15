'use strict';

/** select track controller **/

angular.module('app')
  .controller('SelectTrackController', ['$scope', 'Track', '$state', 'User',
    function($scope, Track, $state, User) {
      $scope.checkUsername = User;
      if ($scope.checkUsername.text == undefined)
        $state.go('forbidden');
      else {
        $scope.username = User;

        $scope.tracks = Track.find();
      }
    },
  ]);
