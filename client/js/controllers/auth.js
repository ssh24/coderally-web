'use strict';

/** user authentication controller **/

angular.module('app')
  .controller('AuthController', ['$scope', '$http', function($scope, $http) {
    // jquery elements
    var myAuthBtn = angular.element(document.querySelector('#authButton'));

    // list of coderally servers
    $scope.servers = [{
      name: 'North American Contest Server',
      link: 'challenge-na.coderallycloud.com',
    }, {
      name: 'Brazilian Contest Server',
      link: 'challenge-br.coderallycloud.com',
    }, {
      name: 'Indian Contest Server',
      link: 'challenge-in.coderallycloud.com',
    }, {
      name: 'Chinese Contest Server',
      link: 'challenge-cn.coderallycloud.com',
    }, {
      name: 'European Contest Server',
      link: 'challenge-eu.coderallycloud.com',
    }, {
      name: 'North American Contest Server',
      link: 'challenge-na.coderallycloud.com',
    }, {
      name: 'Custom Server',
    }];
    /** default chosen servers **/
    $scope.selectedOption = $scope.servers[0];
    $scope.server = $scope.selectedOption.link;

    $scope.isDisabledAuth = false; // enable auth field by default
    $scope.isDisabledServer = true; // disable server field by default
    $scope.isDisabledLogin = true; // disable login field by default

    // auth button
    $scope.authbutton = 'Authenticate';

    // username restrictions
    $scope.userName = {
      text: '',
      id: '',
    };

    /** upon update of servers **/
    $scope.update = function() {
      $scope.isDisabledAuth = false;
      /** if chosen server is not a custom server **/
      if ($scope.selectedOption.name.indexOf('Custom Server') == -1) {
        /** if server field was enabled: use case for user choosing custom server and switching back **/
        if ($scope.isDisabledServer === false) {
          $scope.isDisabledServer = true; // disable server field
        }
        $scope.server = $scope.selectedOption.link;
      } else { /** if chosen server is a custom server **/
        $scope.isDisabledServer = false; // enable server field
      }
      $scope.userName.text = ''; // clear username field
      $scope.isDisabledLogin = true; // disable login field
      $scope.authbutton = 'Authenticate'; // set text to Authenticate
      myAuthBtn.removeClass('positive'); // remove positive class if any
      myAuthBtn.removeClass('negative'); // remove negative class if any
    };

    /** once authBtn is clicked process a request and get info **/
    $scope.authBtn = function() {
      $http({
        method: 'GET',
        url: 'http://' + $scope.server + '/CodeRallyWeb/GetUser?user_name=' + $scope.userName.text,
      }).then(function successCallback(response) {
        if (response.data.success) {
          myAuthBtn.addClass('positive'); // set button status to positive
          $scope.authbutton = 'User successfully authenicated.'; // set button text to success
          $scope.userName.id = response.data.id; // set the id of the user id
          $scope.isDisabledLogin = false; // enable login button
          // proceed onto the next page
          $scope.loginBtn = function() {};
        } else {
          $scope.authbutton = 'Please enter a valid username with letters, ' +
            'numbers and underscores only.'; // set button text to error
          myAuthBtn.addClass('negative'); // set button status to negative
          $scope.isDisabledAuth = true; // disable auth field
        }
      }, function errorCallback(response) {});
    };
  }]);
