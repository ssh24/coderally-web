'use strict';

angular
  .module('app', [
    'ui.router',
    'lbServices',
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
    $urlRouterProvider) {
    $stateProvider
      .state('auth', {
        url: '/auth',
        templateUrl: 'views/auth-user.html',
        controller: 'AuthController',
      });
    $urlRouterProvider.otherwise('auth');
  }]);
