'use strict';

/** vehicle code controller **/

angular.module('app')
  .controller('VehicleCodeController', ['$scope', '$state', 'User',
    'SelectedTrack', 'SelectedVehicle',
    function($scope, $state, User, SelectedTrack, SelectedVehicle) {
      $scope.username = User; // get username info
      $scope.track = SelectedTrack; // get selected track info
      $scope.vehicle = SelectedVehicle; // get selected vehicle info

      // check to see if user is logged in, if not redirect to forbidden
      if ($scope.username.text == undefined || $scope.username.text == '')
        $state.go('forbidden'); // go to forbidden page
      // else continue on select track page
      else {
        $scope.aceLoaded = function(_editor) {
          // Options
          _editor.setReadOnly(true);
        };
      }
    },
  ]);
