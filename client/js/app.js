'use strict';

angular
  .module('app', [
    'ui.router',
    'lbServices',
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
    $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/auth-user.html',
        controller: 'AuthController',
      })
      .state('forbidden', {
        url: '/forbidden',
        templateUrl: 'views/forbidden.html',
      })
      .state('select-track', {
        url: '/select-track',
        templateUrl: 'views/select-track.html',
        controller: 'SelectTrackController',
      });
    $urlRouterProvider.otherwise('login');
  }]);
