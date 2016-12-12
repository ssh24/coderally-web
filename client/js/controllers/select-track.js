'use strict';

/** select track controller **/

angular.module('app')
  .controller('SelectTrackController', ['$scope', 'Track', '$state', 'User',
    function($scope, Track, $state, User) {
      $scope.tracks = Track.find();
      $scope.username = User;
    },
  ]);
