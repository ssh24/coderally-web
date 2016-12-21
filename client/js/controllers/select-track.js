'use strict';

/** select track controller **/

angular.module('app')
  .controller('SelectTrackController', ['$scope', 'Track', '$state', 'User',
    'SelectedTrack',
    function($scope, Track, $state, User, SelectedTrack) {
      $scope.username = User; // set username for account info
      $scope.track = SelectedTrack; // selected track
      $scope.track.chosen = ''; // chosen vehicle

      // check to see if user is logged in, if not redirect to forbidden
      if ($scope.username.text == undefined)
        $state.go('forbidden'); // go to forbidden page
      // else continue on select track page
      else {
        $scope.isDisabledNextSelectTrack = true; // have next button disabled by default

        // logout function
        $scope.logout = function() {
          $state.go('login'); // go back to login page once logged out
        };

        // get list of tracks from the datasource and align them
        $scope.tracks = Track.find();

        // upon selection of tracks tracks
        $scope.toggleTracks = function(track) {
          $scope.selected = track; // set the selected track border
          $scope.track.chosen = track; // choose the selected
          $scope.isDisabledNextSelectTrack = false; // enable next button
        };

        // when clicking next after choosing a select track
        $scope.nextSelectTrack = function() {
          $state.go('select-vehicle'); // go to select vehicle once clicked next
        };
      }
    },
  ]);
