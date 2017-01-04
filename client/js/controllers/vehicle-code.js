'use strict';

/** vehicle code controller **/

angular.module('app')
  .controller('VehicleCodeController', ['$scope', '$state', '$http', 'User',
    'SelectedTrack', 'SelectedVehicle',
    function($scope, $state, $http, User, SelectedTrack, SelectedVehicle) {
      $scope.username = User; // get username info
      $scope.track = SelectedTrack; // get selected track info
      $scope.vehicle = SelectedVehicle; // get selected vehicle info

      // check to see if user is logged in, if not redirect to forbidden
      if ($scope.username.text == undefined || $scope.username.text == '')
        $state.go('forbidden'); // go to forbidden page
      // else continue on vehicle code page
      else {
        $scope.isDisabledNextVehicleCode = true; // have next button disabled by default

        // logout function
        $scope.logout = function() {
          $state.go('login'); // go back to login page once logged out
        };

        // upon ace loaded
        $scope.aceLoaded = function(editor) {
          $http.get($scope.vehicle.chosen.vInfo)
            .success(function(data) {
              editor.$blockScrolling = Infinity;
              editor.setValue(JSON.stringify(data));
              var val = editor.session.getValue();
              var o = JSON.parse(val);
              val = JSON.stringify(o, null, 4);
              editor.setValue(val);
            })
            .error(function(data) {});
        };

        // when clicking back from vehicle code page
        $scope.previousVehicleCode = function() {
          if ($scope.username.text == undefined || $scope.username.text == '')
            $state.go('forbidden'); // go to forbidden page
          else
            $state.go('select-vehicle');
        };

        // when clicking next after modifying code
        $scope.nextVehicleCode = function() {
          if ($scope.username.text == undefined || $scope.username.text == '')
            $state.go('forbidden'); // go to forbidden page
          else {}
          // $state.go('vehicle-code');
        };
      }
    },
  ]);
