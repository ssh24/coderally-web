'use strict';

/** vehicle code controller **/

angular.module('app')
  .controller('VehicleCodeController', ['$scope', '$state', '$http', 'User',
    'SelectedTrack', 'SelectedVehicle',
    function($scope, $state, $http, User, SelectedTrack, SelectedVehicle) {
      // jquery elements
      var copyBtn = angular.element(document.querySelector('#success-copy'));
      var editor = angular.element(document.querySelector('#editor'));

      $scope.username = User; // get username info
      $scope.track = SelectedTrack; // get selected track info
      $scope.vehicle = SelectedVehicle; // get selected vehicle info

      $scope.supported = false; // support for copy button

      // check to see if user is logged in, if not redirect to forbidden
      if ($scope.username.text == undefined || $scope.username.text == '')
        $state.go('forbidden'); // go to forbidden page
      // else continue on vehicle code page
      else {
        // logout function
        $scope.logout = function() {
          $state.go('login'); // go back to login page once logged out
        };

        // once successfully copied
        $scope.successCopy = function() {
          copyBtn.css('display', 'block');
        };

        // on click on the editor
        editor.on('click', function() {
          copyBtn.css('display', 'none');
        });

        // upon ace loaded
        $scope.aceLoaded = function(editor) {
          $http.get($scope.vehicle.chosen.vInfo)
            .success(function(data) {
              editor.$blockScrolling = Infinity; // to fix infinity loop

              /* prettify json code on the editor */
              editor.setValue(JSON.stringify(data));
              var val = editor.session.getValue();
              var o = JSON.parse(val);
              val = JSON.stringify(o, null, 4);
              editor.setValue(val);

              // set value for copying from editor
              $scope.vehicleCode = editor.getValue();
            })
            .error(function(data) {});
        };

        // when clicking back from vehicle code page
        $scope.previousVehicleCode = function() {
          if ($scope.username.text == undefined || $scope.username.text == '')
            $state.go('forbidden'); // go to forbidden page
          else
            $state.go('select-vehicle'); // go to select vehicle page
        };

        // when clicking next after modifying code
        $scope.nextVehicleCode = function() {
          if ($scope.username.text == undefined || $scope.username.text == '')
            $state.go('forbidden'); // go to forbidden page
          else
            $state.go('agent-code'); // go to agent code page
        };
      }
    },
  ]);
