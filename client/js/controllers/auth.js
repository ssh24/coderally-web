'use strict';

/** user authentication controller **/

angular.module('app')
  .controller('AuthController', ['$scope', '$http', function($scope, $http) {
    // jquery elements
    var myAuthBtn = angular.element(document.querySelector('#authButton'));
    var myConnBtn = angular.element(document.querySelector('#connBtn'));

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
      name: 'Chinese Regional Server',
      link: 'challenge-cn.coderallycloud.com',
    }, {
      name: 'European Regional Server',
      link: 'challenge-eu.coderallycloud.com',
    }, {
      name: 'Worldwide Practise Server',
      link: 'www.coderallycloud.com',
    }, {
      name: 'Use Custom Server',
    }];
    /** default chosen servers **/
    $scope.selectedOption = $scope.servers[0];
    $scope.server = $scope.selectedOption.link;
    $scope.customserver = '';

    $scope.isDisabledAuth = false; // enable auth field by default
    $scope.isDisabledServer = true; // disable server field by default
    $scope.isDisabledLogin = true; // disable login field by default

    // auth button
    $scope.authbutton = 'Authenticate';
    $scope.connectionBtn = 'Check connection';

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
        $scope.customserver = '';
        /** if server field was enabled: use case for user choosing custom server and switching back **/
        if ($scope.isDisabledServer === false) {
          $scope.isDisabledServer = true; // disable server field
        }
        $scope.server = $scope.selectedOption.link; // chosen server link
      } else { /** if chosen server is a custom server **/
        $scope.isDisabledServer = false; // enable server field
        $scope.isDisabledAuth = true; // disable auth field
      }
      $scope.userName.text = ''; // clear username field
      $scope.isDisabledLogin = true; // disable login field
      $scope.authbutton = 'Authenticate'; // set text to Authenticate
      $scope.connectionBtn = 'Check connection'; // set text to Authenticate
      myAuthBtn.removeClass('positive'); // remove positive class if any
      myAuthBtn.removeClass('negative'); // remove negative class if any
      myConnBtn.removeClass('positive'); // remove positive class if any
      myConnBtn.removeClass('negative'); // remove positive class if any
    };

    /** click on server connection btn **/
    $scope.serverConnBtn = function() {
      $scope.server = $scope.customserver; // assign chosen server to the link
      $scope.isDisabledServer = true; // disable server field
      $http({
        method: 'GET',
        url: $scope.server,
      }).then(function successCallback(response) {
        $scope.isDisabledAuth = false; // enable auth field
        myConnBtn.addClass('positive'); // add postive class to server connection btm
        $scope.connectionBtn = 'Successfully connected to server.'; // success message upon connecting to remote server
      }, function errorCallback(response) {
        myConnBtn.addClass('negative'); // add negative class to server connection btm
        $scope.connectionBtn = 'Error connecting to server.'; // error message upon connecting to remote server
      });
    };

    /** once authBtn is clicked process a request and get info **/
    $scope.authBtn = function() {
      // do a https request to the server to Authenticate user
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
      }, function errorCallback(response) {
        if ($scope.userName.text == '')
          $scope.authbutton = 'Please enter a valid username with letters, ' +
          'numbers and underscores only.'; // set button text to error
        else
          $scope.authbutton = 'Error authenticating the user.' +
          ' Please contact your server side developers for more info.'; // set button text to error
        myAuthBtn.addClass('negative'); // set button status to negative
        $scope.isDisabledAuth = true; // disable auth field
      });
    };
  }]);
