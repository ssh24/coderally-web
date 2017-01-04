'use strict';

/** select track controller **/

angular.module('app')
  .controller('SelectVehicleController', ['$scope', 'Vehicle', '$state', 'User',
    'SelectedTrack', 'SelectedVehicle',
    function($scope, Vehicle, $state, User, SelectedTrack, SelectedVehicle) {
      $scope.username = User; // get username info
      $scope.chosenTrack = SelectedTrack; // get selected track info
      $scope.vehicle = SelectedVehicle; // set selected vehicle
      $scope.vehicle.chosen = ''; // chosen vehicle

      // check to see if user is logged in, if not redirect to forbidden
      if ($scope.username.text == undefined || $scope.username.text == '')
        $state.go('forbidden'); // go to forbidden page
      // else continue on select track page
      else {
        $scope.isDisabledNextSelectVehicle = true; // have next button disabled by default

        // logout function
        $scope.logout = function() {
          $state.go('login'); // go back to login page once logged out
        };

        // find all the vehicles filtering by the chosen track id
        $scope.vehicles = Vehicle.find({
          filter: {
            where: {
              trackId: $scope.chosenTrack.chosen.id,
            },
          },
        });

        // upon selection of tracks tracks
        $scope.toggleVehicles = function(vehicle) {
          $scope.selected = vehicle; // set the selected track border
          $scope.vehicle.chosen = vehicle; // set the selected vehicle
          $scope.isDisabledNextSelectVehicle = false; // enable next button
        };

        // when clicking back from choosing vehicle page
        $scope.previousSelectVehicle = function() {
          if ($scope.username.text == undefined || $scope.username.text == '')
            $state.go('forbidden'); // go to forbidden page
          else
            $state.go('select-track');
        };

        // when clicking next after choosing a vehicle
        $scope.nextSelectVehicle = function() {
          if ($scope.username.text == undefined || $scope.username.text == '')
            $state.go('forbidden'); // go to forbidden page
          else
            $state.go('vehicle-code');
        };
      }
    },
  ]);
