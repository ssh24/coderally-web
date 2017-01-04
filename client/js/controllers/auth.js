'use strict';

/** user authentication controller **/

angular.module('app')
  .controller('AuthController', ['$scope', '$http', '$state', 'User',
    function($scope, $http, $state, User) {
      // jquery elements
      var authBtn = angular.element(document.querySelector('#authButton'));
      var connBtn = angular.element(document.querySelector('#connButton'));

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
      $scope.userName = User;
      $scope.userName.text = '';

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
        authBtn.removeClass('positive'); // remove positive class if any
        authBtn.removeClass('negative'); // remove negative class if any
        connBtn.removeClass('positive'); // remove positive class if any
        connBtn.removeClass('negative'); // remove positive class if any
      };

      /** click on server connection btn **/
      $scope.serverConnBtn = function() {
        $scope.server = $scope.customserver; // assign chosen server to the link
        $scope.connectionBtn = 'Connecting to custom server ...'; // connect to custom server
        $scope.isDisabledServer = true; // disable server field

        // do a https request to connect to the server
        $http({
          method: 'GET',
          url: $scope.server,
        }).then(function successCallback(response) {
          $scope.connectionBtn = 'Successfully connected to server.'; // success message upon connecting to remote server
          connBtn.addClass('positive'); // add postive class to server connection btn
          $scope.isDisabledAuth = false; // enable auth field
        }, function errorCallback(response) {
          $scope.connectionBtn = 'Error connecting to server.'; // error message upon connecting to remote server
          connBtn.addClass('negative'); // add negative class to server connection btn
        });
      };

      /** once authBtn is clicked process a request and get info **/
      $scope.auth = function() {
        $scope.authbutton = 'Authenticating user ...'; // authenticate user
        $scope.isDisabledAuth = true; // disable auth field

        // do a https request to the server to Authenticate user
        $http({
          method: 'GET',
          url: 'http://' + $scope.server + '/CodeRallyWeb/GetUser?user_name=' +
            $scope.userName.text,
        }).then(function successCallback(response) {
          if (response.data.success) {
            authBtn.addClass('positive'); // set button status to positive
            $scope.authbutton = 'User successfully authenicated.'; // set button text to success
            $scope.isDisabledLogin = false; // enable login button

            // proceed onto the next page
            $scope.login = function() {
              // create a user directory with an agent file on it
              $http({
                method: 'POST',
                url: 'https://code-rally-php.000webhostapp.com/create-dir.php',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded; ' +
                    'charset=UTF-8',
                },
                data: JSON.stringify({
                  username: $scope.userName.text,
                }),
              }).then(function successCallback(response) {},
                function errorCallback(response) {});

              // once logged in go to select-track page
              $state.go('select-track');
            };
          } else {
            $scope.authbutton = 'Please enter a valid username with letters, ' +
              'numbers and underscores only.'; // set button text to error
            authBtn.addClass('negative'); // set button status to negative
            $scope.isDisabledAuth = true; // disable auth field
          }
        }, function errorCallback(response) {
          if ($scope.userName.text == '')
            $scope.authbutton = 'Please enter a valid username with letters, ' +
            'numbers and underscores only.'; // set button text to error
          else
            $scope.authbutton = 'Error authenticating the user.' +
            ' Please try another server or ' +
            'contact the server side developers for more info.'; // set button text to error
          authBtn.addClass('negative'); // set button status to negative
          $scope.isDisabledAuth = true; // disable auth field
        });
      };
    },
  ]);
