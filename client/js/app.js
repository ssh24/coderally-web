'use strict';

angular
  .module('app', [
    'ui.router',
    'lbServices',
    'ui.ace',
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
      }).state('select-vehicle', {
        url: '/select-vehicle',
        templateUrl: 'views/select-vehicle.html',
        controller: 'SelectVehicleController',
      }).state('vehicle-code', {
        url: '/vehicle-code',
        templateUrl: 'views/vehicle-code.html',
        controller: 'VehicleCodeController',
      });
    $urlRouterProvider.otherwise('login');
  }]);
